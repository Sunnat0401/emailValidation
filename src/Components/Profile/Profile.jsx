import React, { useEffect, useState } from 'react';
import './Profile.css';
import Navbar from '../Navbar/Navbar';

const Profile = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (storedUsers.length > 0) {
      setUser(storedUsers[storedUsers.length - 1]); 
    }
  }, []);

  return (
    <div className='profile'>

      <Navbar/> 
      <div className='container'>
       <div className="profile-wrapper">
       <h1>Mening profilim</h1>
        <p><strong>Ism:</strong> {user.firstName || 'Xatolik bor'}</p>
        <p><strong>Familiya:</strong> {user.lastName || 'Xatolik bor'}</p>
        <p><strong>Email:</strong> {user.email || 'Xatolik bor'}</p>
       </div>
      </div>
    </div>
  );
};

export default Profile;
