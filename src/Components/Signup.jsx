import { useState } from 'react';
import './Signup.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import Loader from '../loader/Loader';
import { useNavigate } from 'react-router-dom';

function Signup(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const navigate = useNavigate()

    const registerUser = (e)=>{
        e.preventDefault()
        console.log(email,password,cPassword)
        if (password !== cPassword){
            toast.error('Passwords do  not match')
        } else{
        setIsloading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            setIsloading(false)
            toast.success('Account created successfully')
            navigate('/login')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(error.message)
            setIsloading(false)
            // ..
        });
    }
         
    }
    return (
        <>
        {isLoading && <Loader />}
            <div className="container">
                <h1>Sign Up</h1>
                <form onSubmit={registerUser}>
                    {/* <div class="error">Invalid username or password</div> */}
                    <label >First Name</label>
                    <input type='email'id="login" name="username" placeholder="Enter your Email" required value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                    <label >Password</label>
                    <input type="password"id="login" name="password" placeholder="Set password" required value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                    <label >Confirm Password</label>
                    <input type="password" id="login" name="password" placeholder="Confirm password" required value={cPassword} onChange={(e)=> setCPassword(e.target.value)}></input>
                    <input type="submit" id="login" className='submit'value="Signup"></input>
                </form>
            </div>
        </>
    )
}

export default Signup;