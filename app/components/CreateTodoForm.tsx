import {
  View,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { CreateTodo } from "../types/TodosTypes";

interface Props {
  addTodo: (todo: CreateTodo) => void;
}

const CreateTodoForm = ({ addTodo }: Props) => {
  const [title, setTitle] = useState("");

  const haldeAdding = () => {
    addTodo({
      title: title,
      done: false,
      userEmail: "",
    });
    setTitle("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title_input}
        placeholder="Todo..."
        onChangeText={(text: string) => setTitle(text)}
        value={title}
        maxLength={100}
      />
      <View style={styles.button}>
        <Button
          title="Add todo"
          onPress={() => haldeAdding()}
          disabled={title == ""}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 5,
  },
  title_input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    flex: 0.3,
    borderRadius: 5,
  },
});

export default CreateTodoForm;
