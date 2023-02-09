import React from 'react'
import Todo from './Todo'

// Component TodoList renders a list of added todos and shows if it is checked or not using paramemers
// To display each todo it uses component named Todo and passess the values of each todo.

export default function TodoList({ todos , toggleTodo}) {
  return (
    // with .map function we loop over the todos. 
    todos.map(todo => {
      return <Todo key={todo.id} toggleTodo = {toggleTodo} todo={todo}/>
    })
  )
}
