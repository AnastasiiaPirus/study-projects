import React from 'react'

export default function Todo({ todo , toggleTodo}) {

    function handleTodoClick(){
        toggleTodo(todo.id) //this function written in App.js and toggles "completed" value.
    }

    return (
        <div>
        <label>
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            {todo.name} 
        </label>
        </div>
    )
}
