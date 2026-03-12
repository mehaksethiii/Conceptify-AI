import { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [qrToken, setQrToken] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const { data } = await axios.post(endpoint, formData);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLogin(data.user, data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQRSetup = async () => {
    if (!formData.email) {
      setError('Please enter your email first');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // First login to get token
      const { data: loginData } = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Then get QR code
      const { data: qrResponse } = await axios.get('/api/auth/qr-setup', {
        headers: { Authorization: `Bearer ${loginData.token}` }
      });

      setQrData(qrResponse);
      setShowQR(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const handleQRLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('/api/auth/qr-verify', {
        email: qrData.email,
        token: qrToken
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLogin(data.user, data.token);
    } catch (err) {
      setError('Invalid QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/api/auth/login', {
        email: 'student@demo.com',
        password: 'demo123'
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLogin(data.user, data.token);
    } catch (err) {
      setError('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  if (showQR) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>🔥 QR Code Login</h1>
          <p className="subtitle">Scan with Google Authenticator</p>

          <div className="qr-section">
            <img src={qrData.qrCode} alt="QR Code" className="qr-image" />
            <p className="qr-instructions">
              1. Open Google Authenticator app<br/>
              2. Scan this QR code<br/>
              3. Enter the 6-digit code below
            </p>
          </div>

          <form onSubmit={handleQRLogin}>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={qrToken}
              onChange={(e) => setQrToken(e.target.value)}
              maxLength={6}
              pattern="[0-9]{6}"
              required
            />

            {error && <div className="error">{error}</div>}

            <button type="submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
          </form>

          <button onClick={() => setShowQR(false)} className="back-btn">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🔥 Conceptify AI</h1>
        <p className="subtitle">Doubt-to-Concept Visual Tutor</p>

        <div className="tabs">
          <button 
            className={isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={!isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required={!isLogin}
            />
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />

          {error && <div className="error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        {isLogin && (
          <div className="qr-login-section">
            <button onClick={handleQRSetup} className="qr-btn" disabled={loading}>
              🔒 Setup QR Code Login
            </button>
          </div>
        )}

        <div className="demo-section">
          <p>Or try the demo:</p>
          <button onClick={handleDemoLogin} className="demo-btn" disabled={loading}>
            Demo Login
          </button>
          <small>Email: student@demo.com | Password: demo123</small>
        </div>
      </div>
    </div>
  );
}

export default Login;
