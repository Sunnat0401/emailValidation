import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false); // Loading holatini qo'shish
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.endsWith('@gmail.com') && firstName && lastName) {
      setLoading(true); // Loadingni yoqish

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
          console.log('Response:', json); // JSON javobini tekshiring
          if (json.token) {
            const user = { firstName, lastName, email };
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('token', json.token);
            navigate('/product');
          } else {
            alert('Login muvaffaqiyatsiz bo"ldi, iltimos qayta urinib ko"ring');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Xatolik yuz berdi, iltimos qayta urinib ko"ring');
        })
        .finally(() => {
          setLoading(false); // Loadingni o'chirish
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
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Laoding...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
