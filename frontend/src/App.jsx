import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Login from './Login';
import LandingPage from './LandingPage';
import DarkModeToggle from './DarkMode';
import VoiceInput from './VoiceInput';
import TextToSpeech from './TextToSpeech';
import DifficultyMeter from './DifficultyMeter';
import ShareButton from './ShareButton';
import Dashboard from './Dashboard';
import { History } from './History';
import './App.css';

// Set API base URL from environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
axios.defaults.baseURL = API_URL;

// Set axios default authorization header
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [doubt, setDoubt] = useState('');
  const [level, setLevel] = useState('Class 9-10');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
      setShowLanding(false);
    }
    
    // Load history
    const saved = JSON.parse(localStorage.getItem('doubtHistory') || '[]');
    setHistoryData(saved);
  }, []);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleLogin = (userData, token) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowLanding(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setResponse(null);
    setShowLanding(true);
  };

  const saveToHistory = (doubt, level, response) => {
    const history = JSON.parse(localStorage.getItem('doubtHistory') || '[]');
    const item = {
      id: Date.now(),
      doubt,
      level,
      response,
      timestamp: new Date().toISOString(),
      bookmarked: false
    };
    const updated = [item, ...history].slice(0, 50);
    localStorage.setItem('doubtHistory', JSON.stringify(updated));
    setHistoryData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('doubt', doubt);
      formData.append('level', level);
      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post('/api/explain', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResponse(data);
      saveToHistory(doubt, level, data);
      
      // Also save to S3 (cloud backup)
      await axios.post('/api/save-history', {
        doubt,
        level,
        response: data
      }).catch(() => console.log('Cloud backup skipped'));
      
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
        handleLogout();
      } else {
        alert('Failed to get explanation');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceTranscript = (transcript) => {
    setDoubt(transcript);
  };

  const handleHistorySelect = (item) => {
    setDoubt(item.doubt);
    setLevel(item.level);
    setResponse(item.response);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <DarkModeToggle />
      
      <div className="app">
        <header>
          <div className="header-content">
            <div>
              <h1>🔥 Conceptify AI</h1>
              <p>Doubt-to-Concept Visual Tutor</p>
            </div>
            <div className="user-info">
              <span>Welcome, {user?.name}!</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          </div>
          <div className="nav-buttons">
            <button 
              onClick={() => setShowHistory(!showHistory)} 
              className="nav-btn"
              type="button"
            >
              📚 History
            </button>
            <button 
              onClick={() => setShowDashboard(!showDashboard)} 
              className="nav-btn"
              type="button"
            >
              📊 Dashboard
            </button>
          </div>
        </header>

        {showHistory && (
          <div className="dashboard-top">
            <div className="dashboard-header">
              <h3>📚 Your Learning History ({historyData.length})</h3>
              <button onClick={() => setShowHistory(false)} className="close-btn">✕</button>
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '1rem',
              maxHeight: '500px',
              overflowY: 'auto'
            }}>
              {historyData.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#999', padding: '2rem', gridColumn: '1 / -1' }}>
                  No history yet. Start asking questions!
                </p>
              ) : (
                historyData.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      handleHistorySelect(item);
                      setShowHistory(false);
                    }}
                    style={{
                      background: '#f8f9fa',
                      padding: '1rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      borderLeft: '3px solid transparent',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderLeftColor = '#667eea';
                      e.currentTarget.style.background = '#e9ecef';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderLeftColor = 'transparent';
                      e.currentTarget.style.background = '#f8f9fa';
                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#333', fontSize: '0.95rem' }}>
                      {item.doubt}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#666', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <span style={{
                        background: '#667eea',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        display: 'inline-block',
                        width: 'fit-content',
                        fontSize: '0.75rem'
                      }}>
                        {item.level}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#999' }}>
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {showDashboard && (
          <div className="dashboard-top">
            <div className="dashboard-header">
              <h3>📊 Your Learning Dashboard</h3>
              <button onClick={() => setShowDashboard(false)} className="close-btn">✕</button>
            </div>
            <Dashboard />
          </div>
        )}

        <DifficultyMeter level={level} />

        <form onSubmit={handleSubmit}>
          <VoiceInput onTranscript={handleVoiceTranscript} />
          
          <textarea
            value={doubt}
            onChange={(e) => setDoubt(e.target.value)}
            placeholder="Enter your doubt... (e.g., Explain stack overflow in simple way)"
            required
          />
          
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <optgroup label="School Level">
              <option value="Nursery/KG">Nursery/KG (Age 3-5)</option>
              <option value="Class 1-2">Class 1-2 (Primary)</option>
              <option value="Class 3-5">Class 3-5 (Elementary)</option>
              <option value="Class 6-8">Class 6-8 (Middle School)</option>
              <option value="Class 9-10">Class 9-10 (High School)</option>
              <option value="Class 11-12">Class 11-12 (Senior Secondary)</option>
            </optgroup>
            <optgroup label="College/University">
              <option value="Undergraduate">Undergraduate (BSc/BA/BCom)</option>
              <option value="Engineering">Engineering (BTech/BE)</option>
              <option value="Medical">Medical (MBBS/BDS)</option>
              <option value="Postgraduate">Postgraduate (MSc/MA/MBA)</option>
            </optgroup>
            <optgroup label="Competitive Exams">
              <option value="JEE/NEET">JEE/NEET Preparation</option>
              <option value="UPSC/SSC">UPSC/SSC/Banking</option>
              <option value="GRE/GMAT">GRE/GMAT/CAT</option>
            </optgroup>
            <optgroup label="Professional">
              <option value="Working Professional">Working Professional</option>
              <option value="Research Scholar">Research Scholar/PhD</option>
            </optgroup>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Get Explanation'}
          </button>
        </form>

        {response && (
          <div className="response">
            <div className="response-actions">
              <TextToSpeech text={`${response.explanation}. ${response.analogy}`} />
              <ShareButton doubt={doubt} response={response} />
            </div>

            <section>
              <h2>📖 Explanation</h2>
              <p>{response.explanation}</p>
            </section>

            <section>
              <h2>💡 Real-Life Analogy</h2>
              <p>{response.analogy}</p>
            </section>

            <section>
              <h2>✍️ Practice Questions</h2>
              <ol>
                {response.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ol>
            </section>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
