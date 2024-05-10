import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";

import { StyleSheet } from "react-native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { UserStoreType } from "../types/UserStoreType";
import { observer } from "mobx-react";
import { useStore } from "../context/useStore";

const formShcema = z
  .object({
    email: z.string().min(3).email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  });

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const Register = ({ navigation }: Props) => {
  const { userStore } = useStore();

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formShcema),
  });
  const onSubmit = (form: any) => {
    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    setLoading(true);
    userStore.registerUser(
      form.email,
      form.password,
      () => navigation.navigate("Home"),
      () => setLoading(false),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create account</Text>
      <Controller
        control={control}
        name="email"
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Email"
            />
            {error && <Text style={{ color: "red" }}>{error.message}</Text>}
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              secureTextEntry
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Password"
            />
            {error && <Text style={{ color: "red" }}>{error.message}</Text>}
          </>
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              secureTextEntry
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Confirm Password"
            />
            {error && <Text style={{ color: "red" }}>{error.message}</Text>}
          </>
        )}
      />
      <View style={styles.button_container}>
        <Button
          title="Create account"
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <Text
        style={styles.register_link}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? Log in here
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button_container: {
    width: 300,
    margin: 10,
  },
  register_link: {
    marginTop: 10,
    color: "blue",
  },
});

export default observer(Register);
