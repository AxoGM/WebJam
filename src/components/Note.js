import React, { useState } from "react";

function Note({ notes, onAddNote, onRemoveNote }) {
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNote(note);
    setNote("");
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note"
        />
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note}
            <button onClick={() => onRemoveNote(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Note;
