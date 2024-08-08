import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate(); 

  

  // const goToProfile = () => {
  //   const user = {
  //     name: 'Ali',
  //     surname: 'Vasiyev',
  //     email: 'ali@gmail.com'
  //   };

  //   navigate(`/profile?name=${user.name}&surname=${user.surname}&email=${user.email}`);
  // };

  const goToExit = () => {
    navigate('/'); 
  };

  const userMenu = (
    <Menu>
      {/* <Menu.Item key="profile" icon={<UserOutlined />} onClick={goToProfile}>
        Profil
      </Menu.Item> */}
      
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={goToExit}>
        Chiqish
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='navbar'>
      <div className="container">
      <Link  className='logo'  to={"/home" }> <img src="/star.png" className='logo' alt="logo"/></Link>
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Button
            style={{ marginTop: '14px' }}
            icon={<UserOutlined />}
            className='navbar-btn'
          >
            Foydalanuvchi
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
