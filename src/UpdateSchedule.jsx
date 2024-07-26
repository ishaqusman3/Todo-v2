import { useEffect, useState } from 'react';
import './UpdateSchedule.css';
import api from './api.js';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function UpdateSchedule() {
    const [task, setTask] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                api.get(`/Tasks/${id}`)
                    .then(response => {
                        console.log(response);
                        setTask(response.data.task);
                    })
                    .catch(err => console.error('Error fetching task:', err));
            }
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/updateTask/${id}`, { task, userId })
            .then(result => {
                console.log(result);
                navigate('/Todolist');
            })
            .catch(err => console.log(err));
    };

    return (
        <div id='forms-container'>
            <form onSubmit={handleSubmit}>
                <label>Update task</label>
                <input type="text" id="login" placeholder='Update your task.....' value={task} onChange={(e) => setTask(e.target.value)} required />
                <input type="submit" value="Update" id='update' />
            </form>
        </div>
    );
}
