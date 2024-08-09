import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Modal, Button } from 'antd'; // Ant Design Modal importi
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch('https://fakestoreapi.com/users')
      .then(res => res.json())
      .then(data => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const formattedStoredUsers = storedUsers.map(user => ({
          ...user,
          name: { firstname: user.firstName, lastname: user.lastName }
        }));
        setUsers([...data, ...formattedStoredUsers]);
      })
      .catch(error => console.error('Xatolik yuz berdi:', error));
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);

    // LocalStorage'dan o'chirish
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const filteredStoredUsers = storedUsers.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(filteredStoredUsers));
  };

  const showDeleteConfirm = (id) => {
    setDeletingUserId(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (deletingUserId !== null) {
      handleDelete(deletingUserId);
      setDeletingUserId(null);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDeletingUserId(null);
  };

  return (
    <div className='users'>
      <Navbar />
      <div className='container'>
        <h2 className='users-subtitle'>Foydalanuvchilar Ro'yxati</h2>
        <table className='user-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Deeds</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='user-item'>
                <td>
                  <span>{user.name.firstname} {user.name.lastname}</span>
                </td>
                <td>{user.email}</td>
                <td>
                  <Button
                    type="primary"
                    danger
                    onClick={() => showDeleteConfirm(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title="O'chirishni tasdiqlang"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="ok"
        cancelText="Cancel"
        okButtonProps={{ style: { backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff' } }} // Yashil rang
        cancelButtonProps={{ style: { borderColor: '#d9d9d9', color: '#000' } }}
      >
        <p>Ushbu foydalanuvchini o'chirishni tasdiqlaysizmi?</p>
      </Modal>
    </div>
  );
};

export default Users;
