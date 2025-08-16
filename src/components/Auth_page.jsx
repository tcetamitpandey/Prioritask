
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../components/Auth_fun';

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;

    if (mode === 'login') {
      result = await signIn(email, password);
    } else {
      result = await signUp(email, password);
    }

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage('Success!');
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="auth-container">
  <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>

  <form onSubmit={handleSubmit} className="auth-form">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      required
      className="auth-input"
    />
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      required
      className="auth-input"
    />
    <button type="submit" className="auth-button">
      {mode === 'login' ? 'Login' : 'Sign Up'}
    </button>
  </form>

  <p className="auth-message">{message}</p>

  <button
    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
    className="switch-button"
  >
    Switch to {mode === 'login' ? 'Sign Up' : 'Login'}
  </button>
</div>

  );
}
