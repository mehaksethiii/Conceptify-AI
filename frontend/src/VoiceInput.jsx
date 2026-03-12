import { useState } from 'react';
import './VoiceInput.css';

function VoiceInput({ onTranscript }) {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice input not supported in this browser. Try Chrome.');
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Voice input failed. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <button 
      type="button"
      className={`voice-btn ${isListening ? 'listening' : ''}`}
      onClick={startListening}
      title="Voice Input"
    >
      {isListening ? '🎤 Listening...' : '🎤 Voice Input'}
    </button>
  );
}

export default VoiceInput;
