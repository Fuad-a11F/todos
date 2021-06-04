import React from "react"

export default function TodoItem({ todoTxt, checkTodo, deleteTodo, changoTitle }) {
    return (
        <div onDoubleClick={() => changoTitle(todoTxt.id)} className='todoItem'>
            <div className='todoItem__row'>
                <div className="todoItem__checked"><input type="checkbox" checked={todoTxt.compared} onChange={() => checkTodo(todoTxt.id)} /></div>
                <div className={todoTxt.compared ? 'todoItem__text done' : 'todoItem__text' }>{todoTxt.title}</div>
            </div>
            <div className="tidoItem__clear" onClick={() => deleteTodo(todoTxt.id)} >X</div>
        </div>
    )
}