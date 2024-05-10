import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { UserStoreType } from "../types/UserStoreType";
import { StyleSheet } from "react-native";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { CreateTodo, Todo } from "../types/TodosTypes";
import CreateTodoForm from "../components/CreateTodoForm";
import TodosList from "../components/TodosList";
import { observer } from "mobx-react";
import { handleError } from "../helpers/handleError";
import { useStore } from "../context/useStore";

interface Props {
  navigation: any;
}

const Home = ({ navigation }: Props) => {
  const { userStore } = useStore();

  const [todos, setTodos] = useState<Todo[]>([] as Todo[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userStore.user) {
      navigation.navigate("Login");
      return;
    }

    const ref = collection(db, "todos");

    const subscribe = onSnapshot(ref, {
      next(snapshot) {
        setIsLoading(true);
        try {
          const todos: Todo[] = [];

          snapshot.docs
            .filter((t) => {
              const todo = t.data() as Todo;
              return todo.userEmail === userStore.user?.email;
            })
            .forEach((item) => {
              todos.push({ ...item.data(), id: item.id } as Todo);
            });

          setTodos(todos);
        } catch (e: any) {
          handleError(e);
        } finally {
          setIsLoading(false);
        }
      },
    });

    return () => subscribe();
  }, [userStore.user]);
  
  const addTodo = async (todo: CreateTodo) => {
    if (!userStore.user) return;
    const doc = await addDoc(collection(db, "todos"), {
      ...todo,
      userEmail: userStore.user.email,
    });
    console.log(doc);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <Text style={styles.header}>Your todos</Text>
          <CreateTodoForm addTodo={addTodo} />
          <TodosList todos={todos} />
          <TouchableOpacity style={{marginTop: 10, borderWidth: 1, borderRadius: 5, padding: 5}} onPress={() => userStore.signOutUser()}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
  },
});

export default observer(Home);
