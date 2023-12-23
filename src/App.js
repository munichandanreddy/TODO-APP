
import './App.css';

import React, { useState, useEffect } from 'react';
import './App.css';


const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false, timestamp: Date.now() }]);
      setInputValue('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const resetTodos = () => {
    setTodos([]);
  };

  return (
    <div className="todo-app">
      <div className="header">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
      </div>
      <div className="todos">
        {todos.map((todo, index) => (
          <div
            key={index}
            className={`todo ${todo.completed ? 'completed' : ''}`}
            onClick={() => toggleTodo(index)}
          >
            {todo.text}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetTodos}>
        Reset
      </button>
    </div>
  );
};


export default TodoApp;
