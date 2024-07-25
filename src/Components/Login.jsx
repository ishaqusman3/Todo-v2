import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import your login styles
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../loader/Loader';


function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const navigate = useNavigate()
    
    const loginUser = (e)=>{
        e.preventDefault()  
        setIsloading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setIsloading(false)
            toast.success('Logged in successfully')
            navigate('/Todolist')
            // ...
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
                <form onSubmit={loginUser}>
                <label >Email</label>
                <input type="email" name="email" placeholder="Enter your Email" required value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                <label >Password</label>
                <input type="password" name="password" placeholder="Enter your password" required value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                <input type="submit" value="Login" id="login" className='submit'></input>
                </form>
            </div>
            
        </>
    )
}

export default Login;