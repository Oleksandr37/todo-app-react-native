import { View, ScrollView } from 'react-native'
import React from 'react'
import { Todo } from '../types/TodosTypes'
import TodoCard from './TodoCard'

interface Props {
    todos: Todo[]
}

const TodosList = ({todos} : Props) => {
  return (
    <View style={{flex: 1, alignSelf: "stretch", marginTop: 10}}>
        <ScrollView style={{ gap: 5, alignSelf: "stretch"}} showsVerticalScrollIndicator={false}>
            {todos.map((todo) => <TodoCard key={todo.id} {...todo}/>)}
        </ScrollView>
    </View>
  )
}

export default TodosList