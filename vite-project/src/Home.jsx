import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';
// Ensure this is the correct path to your CSS file

const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    };

    const handleAddTask = (newTask) => {
        setTodos([...todos, newTask]);
    };

    const handleEdit = (id) => {
        const todo = todos.find(todo => todo._id === id);
        if (todo) {
            axios.put(`http://localhost:3001/update/${id}`, { done: !todo.done })
                .then(result => {
                    setTodos(todos.map(todo => todo._id === id ? { ...todo, done: !todo.done } : todo));
                })
                .catch(err => console.log(err));
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(result => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h2>To DO LIST</h2>
            <Create onAddTask={handleAddTask} />
            <div className='task_list'>
                  {todos.length === 0
                    ? <div><h2>No Record</h2></div>
                    : todos.map(todo => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                {todo.done
                                    ? <BsFillCheckCircleFill className='icon' />
                                    : <BsCircleFill className='icon' />
                                }
                                <p className={todo.done ? 'line_through' : ''}>{todo.task}</p>
                            </div>
                            <div>
                                <span onClick={() => handleDelete(todo._id)}><BsFillTrashFill className='icon' /></span>
                            </div>
                        </div>
                    ))
               }
            </div>
        </div>
    );
};

export default Home;
