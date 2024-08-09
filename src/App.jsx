import React from 'react';
import Login from './Components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import Product from './Components/Product/Product';
import Users from './Components/Users/Users';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='users' element={<Users/>}/>
      </Routes>
  );
};

export default App;
