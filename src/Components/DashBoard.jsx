// Dashboard.jsx
import React, { useState } from 'react';
// import Modal from './Modal'; // Import your Modal component
import Login from './Login'; // Import your Login component
import Signup from './Signup'; // Import your Signup component
import Modal from '../Modal';
import './DashBoard.css'

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Track whether it's login or signup

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <h1>Welcome to Todo App</h1>
      <img src="https://th.bing.com/th?id=OIP.Tai24BuXPmuSiOsItwzedgHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" id='image' alt="pic" />
    
      <button className='button' onClick={toggleModal}>Get Started</button>

      <Modal show={isModalOpen} handleClose={toggleModal} isLogin={isLogin} toggleForm={toggleForm}>
        {isLogin ? <Login /> : <Signup />}
      </Modal>
    </div>
  );
}

export default Dashboard;
