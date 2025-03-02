const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

let notes = [];
let todos = [];

app.post("/api/notes", (req, res) => {
  notes.push(req.body);
  res.status(201).send();
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.delete("/api/notes/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < notes.length) {
    notes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.post("/api/todos", (req, res) => {
  todos.push(req.body);
  res.status(201).send();
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.delete("/api/todos/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < todos.length) {
    todos.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
