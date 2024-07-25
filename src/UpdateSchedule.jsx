import { useEffect, useState } from 'react';
import './UpdateSchedule.css';
import api from './api.jsx';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateSchedule() {
    const [task, setTask] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        api.get(`/Tasks/${id}`)
            .then(response => {
                console.log(response);
                setTask(response.data.task);
            })
            .catch(err => console.error('Error fetching task:', err));
    }, [id]);

    const Submit = (e) => {
        e.preventDefault();
        api.put(`/updateTask/${id}`, { task })
        .then(result => {
            console.log(result);
            navigate('/Todolist');
        })
        .catch(err => console.log(err));
    };

    return (
        <div id='forms-container'>
            <form onSubmit={Submit}>
                <label>Update task</label>
                <input type="text" id="login" placeholder='Update your task.....' value={task} onChange={(e) => setTask(e.target.value)} required />
                <input type="submit" value="Update" id='update' />
            </form>
        </div>
    );
}
