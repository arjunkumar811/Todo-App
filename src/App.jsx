import { useState, useEffect } from "react";
import "./App.css";
import PropTypes from "prop-types";

function App() {
  // Update initial state to use localStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : [
          {
            id: 1,
            title: "Go to gym",
            description: "Hit the gym regularly",
            done: false,
            createdAt: new Date().toISOString(),
          },
        ];
  });

  // Add controlled inputs state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Updated addTodo function
  function addTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        title,
        description,
        done: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setTitle("");
    setDescription("");
  }

  // Add delete function
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // Add toggle function
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  // Return the JSX to render the component
  return (
    <div className="main">
      <h1 className="header">Todo App</h1>
      <form className="form-container" onSubmit={addTodo}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          type="text"
          placeholder="Enter Todo Title"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
          type="text"
          placeholder="Write Todo Description"
        />
        <button type="submit" className="add-btn">
          Add Todo
        </button>
      </form>

      <div className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            onDelete={() => deleteTodo(todo.id)}
            onToggle={() => toggleTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
}

function Todo({ title, description, done, createdAt, onDelete, onToggle }) {
  return (
    <div className={`todo-item ${done ? "done" : ""}`}>
      <div className="todo-content">
        <h3 className="todo-title">
          <input
            type="checkbox"
            checked={done}
            onChange={onToggle}
            className="todo-checkbox"
          />
          {title}
        </h3>
        <p className="todo-description">{description}</p>
        <p className="todo-date">{new Date(createdAt).toLocaleDateString()}</p>
      </div>
      <button onClick={onDelete} className="delete-btn">
        Delete
      </button>
    </div>
  );
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  done: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default App;
