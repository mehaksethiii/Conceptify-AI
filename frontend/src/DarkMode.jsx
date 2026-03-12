import { useState, useEffect } from 'react';
import './DarkMode.css';

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setIsDark(saved);
    if (saved) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', newMode);
    
    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <button className="dark-mode-toggle" onClick={toggleDarkMode}>
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

export default DarkModeToggle;
