import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Link, useHistory } from 'react-router-dom';
import '../styles/Auth.css';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      history.push('/blogs');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="auth-form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-submit">Login</button>
      </form>

      <div className="auth-toggle">
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </div>
    </div>
  );
}
