import { useState } from 'react';
import './TextToSpeech.css';

function TextToSpeech({ text }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported in this browser');
    }
  };

  return (
    <button 
      onClick={speak} 
      className={`tts-btn ${isSpeaking ? 'speaking' : ''}`}
      title="Listen to explanation"
    >
      {isSpeaking ? '⏸️ Pause' : '🔊 Listen'}
    </button>
  );
}

export default TextToSpeech;
