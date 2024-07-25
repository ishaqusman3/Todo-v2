import React, { useState, useEffect } from 'react';
import api from './api.jsx';
import { Link, useNavigate } from 'react-router-dom';
import './Todolist.css';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/config';
import { toast } from 'react-toastify';
import Salutation from './Components/Salutation';
import { onAuthStateChanged } from 'firebase/auth';

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [displayName, setDisplayName] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserId(uid);
                const displayName = user.displayName || user.email.split('@')[0];
                setDisplayName(displayName.charAt(0).toUpperCase() + displayName.slice(1));

                // Fetch tasks when user is authenticated
                api.get('/Tasks', {
                    params: { userId: uid }
                })
                .then(response => {
                    setTasks(response.data);
                })
                .catch(err => console.error('Error fetching tasks:', err));
            } else {
                setDisplayName('');
                setTasks([]);
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const handleDelete = (id) => {
        api.delete(`/deleteTask/${id}`)
        .then(res => {
            console.log(res);
            setTasks(tasks.filter(task => task._id !== id));
        })
        .catch(err => console.log(err));
    };

    const logoutUser = () => {
        signOut(auth).then(() => {
            toast.success('Logged out successfully!');
            navigate('/');
        }).catch((error) => {
            toast.error(error.message);
        });
    };

    return (
        <>
            <h3><Salutation /> {displayName} <br />List Your schedules</h3>
            <div className='todo-lists'>
                <Link to='/AddTask' className='addTask'> Add Task</Link>
                <ul>
                    {tasks.map(task => (
                        <li key={task._id}>
                            <button id='delete-icon' onClick={() => handleDelete(task._id)}>
                                <FontAwesomeIcon className='delete-icon' icon={faTrashCan} />
                            </button>
                            <Link to={`/UpdateTask/${task._id}`} id='link-style'>
                                {task.task || 'No task name'} {/* Handle undefined task names */}
                            </Link>
                        </li>
                    ))}
                </ul>
                <button className='addTask' id='addTask' onClick={logoutUser}>Logout</button>
            </div>
        </>
    );
}
