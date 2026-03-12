import { useState } from 'react';
import axios from 'axios';
import './SaveNotes.css';

function SaveNotes({ doubt, level, response }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post('/api/save-note', {
        doubt,
        level,
        response,
        timestamp: new Date().toISOString()
      });
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save note. Using local storage instead.');
      
      // Fallback to localStorage
      const notes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
      notes.unshift({
        id: Date.now(),
        doubt,
        level,
        response,
        timestamp: new Date().toISOString(),
        saved: true
      });
      localStorage.setItem('savedNotes', JSON.stringify(notes.slice(0, 100)));
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <button 
      onClick={handleSave} 
      className={`save-note-btn ${saved ? 'saved' : ''}`}
      disabled={saving || saved}
      title="Save this explanation to your notes"
    >
      {saving ? '💾 Saving...' : saved ? '✅ Saved!' : '💾 Save Note'}
    </button>
  );
}

export default SaveNotes;
