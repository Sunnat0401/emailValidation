import React from 'react';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Profile from './Components/Profile/Profile';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
  );
};

export default App;
