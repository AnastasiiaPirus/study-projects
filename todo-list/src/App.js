import React, {useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
  //next const uses object destucturing. First variable 'todos' - it is every todo inside of the useState.
  //Second variable 'setTodos' - is a function we call to update those todos.
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef(); // gives acces to the input element


  //This useEffect loads our saved in local storage todos once, when page is loading.
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) //JSON.parse converts our string to an array.
    if (storedTodos) setTodos( prevTodos => [...prevTodos, ...storedTodos] );
  },[])

  //This useEffect saves todos in local storage. Without it all todos will be cleared after reloading the page.
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)) // JSON.stringlify ransforms objects to JSON string.
  },[todos])

  function toggleTodo(id) {
    const newTodos = [...todos] //copies todolist so we don't modify it
    const todo = newTodos.find(todo=> todo.id === id) // here we finding todo that matches the id that we passed.
    todo.complete = !todo.complete;
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value //referencing to the value of input element
    if (name === "")return //if name is empty it is going to return to prevent from saving empty todo.
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name:name, complete:false}]
    })
    todoNameRef.current.value = null; // clears input field after adding new item
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo=>!todo.complete) // selects only uncompleted todos.
    setTodos(newTodos)
  }

  return (
    <>
    {/* todos = {todos} - are props. We pass them just like attribures in HTML. */}
      <TodoList todos ={todos} toggleTodo = {toggleTodo}/> 
      <input ref = {todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add ToDo</button>
      <button onClick={handleClearTodos}>Clear Completed ToDos</button>
      <div>{todos.filter(todo=> !todo.complete).length} left to do</div>
    </>
    
  );
}

export default App;
