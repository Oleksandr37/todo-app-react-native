import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import React, { useState } from "react";
import { Todo, UpdateTodo } from "../types/TodosTypes";
import { StyleSheet } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { doc } from "firebase/firestore";

const TodoCard = (todo: Todo) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const ref = doc(db, `todos/${todo.id}`);

  const updateTodo = async (newTodo: UpdateTodo) => {
    try {
      await updateDoc(ref, { ...newTodo });
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };
  const deleteTodo = async () => {
    try {
      await deleteDoc(ref);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => updateTodo({ ...todo, done: !todo.done })}
      >
        {todo.done ? (
          <Ionicons name="checkmark-circle" size={24} color="green" />
        ) : (
          <Ionicons name="ellipse-outline" size={24} color="black" />
        )}
      </TouchableOpacity>
      {isEditing ? (
        <TextInput
          style={styles.titleInput}
          value={newTitle}
          onChangeText={(text) => setNewTitle(text)}
          maxLength={100}
        />
      ) : (
        <Text style={todo.done ? styles.titleCompleted : styles.title}>{todo.title}</Text>
      )}
      <TouchableOpacity
        onPress={() => {
          if (isEditing) updateTodo({ ...todo, title: newTitle });
            
          setIsEditing(prev => !prev);
        }}
      >
        {isEditing ? (
          <Ionicons name="save" size={24} color="green" />
        ) : (
          <Ionicons name="pencil" size={24} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteTodo}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "#f9f9f9",
    flex: 1,
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    flex: 1,
  },
  titleCompleted: {
    fontSize: 20,
    flex: 1,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
  titleInput: {
    fontSize: 20,
    flex: 1,
    borderWidth: .5,
    borderRadius: 5,
    padding: 5
  },
});

export default TodoCard;
