import React, { useState } from 'react';
import './Modal.css'; // Import your modal styles
import Login from './Components/Login'; // Import the Login component
import Signup from './Components/Signup'; // Import the Signup component
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from './loader/Loader';

const Modal = ({ handleClose, show, isLogin, toggleForm }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const navigate = useNavigate()
  const [isLoading, setIsloading] = useState(false)
  const provider = new GoogleAuthProvider()
  const signinWithGoogle = ()=>{
    setIsloading(true)
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      toast.success('Loged in Successful!!')
      navigate('Todolist')
      setIsloading(false)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      toast.error(errorMessage)
      setIsloading(false)
    // ...
  });
  }

  return (
    <div className={showHideClassName}>
      {isLoading && <Loader /> }
      <section className="modal-main">
        {isLogin ? <Login /> : <Signup />}
        <button type="button" id='btn' onClick={toggleForm}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
        <button  type="button" id='btn' onClick={signinWithGoogle}>
          Sign in with Google
        </button>
        <button type="button" id='btn' onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
