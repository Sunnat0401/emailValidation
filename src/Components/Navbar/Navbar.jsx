import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (storedUsers.length > 0) {
      setUser(storedUsers[storedUsers.length - 1]); // Eng oxirgi foydalanuvchini olamiz
    }
  }, []);

  const goToProfile = () => {
    if (user) {
      navigate(`/profile?name=${user.firstName}&surname=${user.lastName}&email=${user.email}`);
    }
  };

  const goToExit = () => {
    navigate('/');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={goToProfile}>
        {user ? `${user.firstName}ning profili` : 'Profil'}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={goToExit}>
        Chiqish
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='navbar'>
      <div className="container">
        <Link className='logo' to={"/product"}><img src="/star.png" className='logo' alt="logo"/></Link>
        <ul className='navbar-lists'>
          <Link to={'/product'} className='navbar-list'>Product</Link>
          <Link to={'/users'} className='navbar-list'>Users</Link>
        </ul>
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Button
            style={{ marginTop: '14px' }}
            icon={<UserOutlined />}
            className='navbar-btn'
          >
            {user ? user.firstName : 'Foydalanuvchi'}
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
