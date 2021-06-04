import React, { useEffect } from 'react';
import './App.css';
import Header from './header/Header';
import TodoForm from './main/TodoForm';
import TodoInfo from './main/TodoInfo';
import Footer from './footer/Footer';
import TodoItem from './main/TodoItem';

function App() {
  let [todoTxt, setTodoTxt] = React.useState([])
  let [showTxt, setShowTxt] = React.useState([true, false, false])
  let inputRef = React.useRef()
  let [canChange, setCanChange] = React.useState(true)

  useEffect(() => {
    try {
      inputRef.current.focus()
    }
    catch {}
  })

  let clear_completed = todoTxt.filter(item => item.compared)

  function addTodoTXT(e, title, setTitle) {
    e.preventDefault()
    if (title) {
      setTodoTxt(todoTxt.concat({
        id: Date.now(),
        title: title,
        compared: false,
        order: todoTxt.length + 1,
        changeForm: false
      }))
      setTitle('')
    }
  }

  function checkTodo(index) {
    setTodoTxt(todoTxt.map(item => {
        if (item.id === index) {
          item.compared = !item.compared
      }
      return item
    }))
  }

  function deleteTodo(index) {
    setTodoTxt(todoTxt.filter(item => item.id !== index))
  }

  function clearChecked() {
    setTodoTxt(todoTxt.filter(item => !item.compared))
  }

  function changoTitle(index) {
    if (!canChange) {
      return
    }
    setCanChange(false)
    setTodoTxt(todoTxt.map(item => {
      if (item.id === index) {
        item.changeForm = true
      }
      return item
    }))
  }

  function changeTextFunction(e, item) {
    setTodoTxt(todoTxt.map(obj => {
      if (obj.id === item.id) {
        obj.title = e.target.value
      }
      return obj
    }))
  }

  function saveChangeText(index) {
    setCanChange(true)
    setTodoTxt(todoTxt.map(item => {
      if (item.id === index) {
        item.changeForm = false
      }
      return item
    }))
  }

  return (
    <div className="App container">
        <Header />
        <div className="todoMain">
            <TodoForm todoTxt={todoTxt} setTodoTxt={setTodoTxt} addTodoTXT={addTodoTXT}/>
            {todoTxt.map(item => {
              if (showTxt[0]) {
                if (!item.changeForm) {
                  return <TodoItem key={item.id} changoTitle={changoTitle} checkTodo={checkTodo} deleteTodo={deleteTodo} todoTxt={item}/>
                }
                else {
                  return (
                    <div key={item.id} className='change__wrapper'>
                      <input ref={inputRef} className='change__text' type='text' value={item.title} onChange={(e) => changeTextFunction(e, item)}/>
                      <button className='change__btn' onClick={() => saveChangeText(item.id)}>✓</button>
                    </div>
                  )
                }
              }
              else if (showTxt[1]) {
                if (!item.changeForm) {
                  if (item.compared) {
                    return <TodoItem key={item.id} changoTitle={changoTitle} checkTodo={checkTodo} deleteTodo={deleteTodo} todoTxt={item} />
                  }
                }
                else {
                  if (item.compared) {
                    return (
                      <div key={item.id} className='change__wrapper'>
                        <input ref={inputRef} className='change__text' type='text' value={item.title} onChange={(e) => changeTextFunction(e, item)}/>
                        <button className='change__btn' onClick={() => saveChangeText(item.id)}>✓</button>
                      </div>
                    )
                  }
                }
              }
              else if (showTxt[2]) {
                if (!item.changeForm) {
                  if (!item.compared) {
                    return <TodoItem key={item.id} changoTitle={changoTitle} checkTodo={checkTodo} deleteTodo={deleteTodo} todoTxt={item} />
                  }
                }
                else {
                  if (!item.compared) {
                    return (
                      <div key={item.id} className='change__wrapper'> 
                        <input ref={inputRef} className='change__text' type='text' value={item.title} onChange={(e) => changeTextFunction(e, item)}/>
                        <button className='change__btn' onClick={() => saveChangeText(item.id)}>✓</button>
                      </div>
                    )
                  }
                }
              }
            })}
            {todoTxt.length > 0 ? <TodoInfo showTxt={showTxt} setShowTxt={setShowTxt} number={todoTxt.filter(item => item.compared === false).length} clear={clear_completed.length} clearChecked={clearChecked} /> : <span></span>}      
        </div>
        <Footer />
    </div>
  );
}

export default App;

