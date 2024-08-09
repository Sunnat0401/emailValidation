import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(savedUsers);
  }, []);

  return (
    <div className='home'>
      <Navbar />

    </div>
  );
};

export default Home;
