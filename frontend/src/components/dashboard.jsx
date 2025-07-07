import React, { useState } from 'react';
import '../App.css';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddNote = () => {
    if (noteInput.trim() === '') return;

    const currentDate = new Date().toLocaleDateString(); // only date

    if (editingIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = {
        ...updatedNotes[editingIndex],
        text: noteInput,
        date: currentDate,
      };
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      setNotes([...notes, { text: noteInput, date: currentDate }]);
    }

    setNoteInput('');
  };

  const handleEditNote = (index) => {
    setNoteInput(notes[index].text);
    setEditingIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updated = [...notes];
    updated.splice(index, 1);
    setNotes(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setNoteInput('');
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">My Notes</h2>

      <div className="note-input-section">
        <textarea
          placeholder="Write your note here..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        ></textarea>
        <button onClick={handleAddNote}>
          {editingIndex !== null ? 'Update Note' : 'Add Note'}
        </button>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="no-notes-text">No notes yet.</p>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="note-item">
              <p className="note-text">{note.text}</p>
              <p className="note-date">📅 {note.date}</p>
              <div className="note-actions">
                <button className="edit-btn" onClick={() => handleEditNote(index)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteNote(index)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
