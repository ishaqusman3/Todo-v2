import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import your login styles
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../loader/Loader';


function Reset(){
    const [email, setEmail] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const navigate = useNavigate()
    
    const resetUser = (e)=>{
        e.preventDefault()  
        setIsloading(true)
        sendPasswordResetEmail(auth, email)
        .then(() => {
            toast.success('Reset link sent successful!')
            setIsloading(false)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage)
            setIsloading(false)
        });
    }
    return (
        <>
         {isLoading && <Loader />}
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={resetUser}>
                <label >Email</label>
                <input type="email" name="email" placeholder="Enter your Email" required value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                <label >Password</label>
                <input type="submit" value="Login" id="login" className='submit'></input>
                </form>
            </div>
            
        </>
    )
}

export default Login;