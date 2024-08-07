import React, { useEffect, useState } from 'react';
import './Profile.css';
import Navbar from '../Navbar/Navbar';

const Profile = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
   <Navbar/> 
    <div className='profile'>
      <h1>Mening profilim </h1>
      <p><strong>Ism:</strong> {user.firstName || 'Xatolik bor '}</p>
      <p><strong>Familiya:</strong> {user.lastName || 'Xatolik bor '}</p>
      <p><strong>Email:</strong> {user.email || 'Xatolik bor '}</p>
    </div>
    </>
  );
};

export default Profile;
