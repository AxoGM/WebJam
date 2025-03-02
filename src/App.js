import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import Todo from "./components/Todo";
import FileUpload from "./components/FileUpload";
import { login, register } from "./services/authService";
import { encryptData, decryptData } from "./services/encryptionService";
import "./styles.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const encryptedNotes = await fetch("/api/notes").then((res) =>
        res.json(),
      );
      const encryptedTodos = await fetch("/api/todos").then((res) =>
        res.json(),
      );
      setNotes(decryptData(encryptedNotes));
      setTodos(decryptData(encryptedTodos));
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleLogin = async (username, password) => {
    const user = await login(username, password);
    setUser(user);
  };

  const handleRegister = async (username, password) => {
    const user = await register(username, password);
    setUser(user);
  };

  const handleAddNote = async (note) => {
    const encryptedNote = encryptData(note);
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(encryptedNote),
    });
    setNotes([...notes, note]);
  };

  const handleRemoveNote = async (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    // Implement backend removal logic if needed
  };

  const handleAddTodo = async (todo) => {
    const encryptedTodo = encryptData(todo);
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(encryptedTodo),
    });
    setTodos([...todos, todo]);
  };

  const handleRemoveTodo = async (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    // Implement backend removal logic if needed
  };

  return (
    <div className="app">
      {user ? (
        <div>
          <Note
            notes={notes}
            onAddNote={handleAddNote}
            onRemoveNote={handleRemoveNote}
          />
          <Todo
            todos={todos}
            onAddTodo={handleAddTodo}
            onRemoveTodo={handleRemoveTodo}
          />
          <FileUpload />
        </div>
      ) : (
        <div>
          <h1>Welcome to Note!</h1>
          <button onClick={() => handleLogin("user", "password")}>Login</button>
          <button onClick={() => handleRegister("user", "password")}>
            Register
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
