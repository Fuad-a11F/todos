import React from 'react';

export default function TodoForm( { todoTxt, addTodoTXT }) {
    let [word, setWord] = React.useState('')


    return (
        <form className='todoForm' onSubmit={(e) => addTodoTXT(e, word, setWord)}>
            <input value={word} type="text" placeholder="What needs to do done?" onChange={(e) => setWord(e.target.value)}/>
        </form>
    )
}