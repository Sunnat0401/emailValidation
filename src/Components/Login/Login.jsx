import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.endsWith('@gmail.com') && firstName && lastName) {
      fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'mor_2314',
          password: '83r5^_', 
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Login muvaffaqiyatsiz bo"ldi');
          }
          return res.json();
        })
        .then((json) => {
          if (json.token) {
            localStorage.setItem('user', JSON.stringify({ firstName, lastName, email }));
            localStorage.setItem('token', json.token);
            navigate('/home');
          } else {
            alert('Login muvaffaqiyatsiz bo"ldi, iltimos qayta urinib ko"ring');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Xatolik yuz berdi, iltimos qayta urinib ko"ring');
        });
    } else {
      alert('Iltimos, barcha maydonlarni to"ldiring va @gmail.com bilan tugaydigan email kiriting');
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="login-input"
            placeholder="Ismingizni kiriting ..."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            className="login-input"
            placeholder="Familiyangizni kiriting ..."
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            className="login-input"
            placeholder="Email kiriting --- @gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
