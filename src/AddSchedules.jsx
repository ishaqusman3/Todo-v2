import './AddSchedules.css';
import api from './api.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddSchedules() {
    const [task, setTask] = useState('');
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        api.post('/AddTask', { task })
        .then(result => {
            console.log(result);
            navigate('/Todolist');
        })
        .catch(err => console.log(err));
    };

    return (
        <div id='forms-container'>
            <form onSubmit={Submit}>
                <label>Add a task</label>
                <input type="text" id="login" placeholder='Add your tasks.....' onChange={(e) => setTask(e.target.value)} required />
                <button type="submit" id='login'> Add</button>
            </form>
        </div>
    );
}
