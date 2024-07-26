import './AddSchedules.css';
import api from './api.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function AddSchedules() {
    const [task, setTask] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            }
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/AddTask', { task, userId })
            .then(result => {
                console.log(result);
                navigate('/Todolist');
            })
            .catch(err => console.log(err));
    };

    return (
        <div id='forms-container'>
            <form onSubmit={handleSubmit}>
                <label>Add a task</label>
                <input type="text" id="login" placeholder='Add your tasks.....' onChange={(e) => setTask(e.target.value)} required />
                <button type="submit" id='login'>Add</button>
            </form>
        </div>
    );
}
