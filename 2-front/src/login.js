import  {   useState } from 'react';
import './total.css';
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
export default function Login() {

    const nav = useNavigate();


    const [data, setData] = useState({ name: '', password: '' });

    const handler = (e) => {
        const { name, value } = e.target;
        setData((prevstate) => ({
            ...prevstate, [name]: value
        }))
    }



    const submithandler = (e) => {
        e.preventDefault();

        const details = { name: data.name, password: data.password };

        axios.post('http://localhost:8001/logina', details)
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    localStorage.setItem('name', res.data[0].name);
                    localStorage.setItem('role', res.data[0].role);
                    if (res.data[0].role === 'admin') {
                        alert('Admin login successful');
                        nav(`/details/${res.data[0].role}/${res.data[0].name}`);
                    }
                } else {
                    return axios.post('http://localhost:8001/loginm', details);
                }
            })
            .then((res) => {
                if (res && res.data && res.data.length > 0) {
                    localStorage.setItem('name', res.data[0].name);
                    localStorage.setItem('role', res.data[0].role);
                    if (res.data[0].role === 'manager') {
                        alert('Manager login successful');
                        nav(`/details/${res.data[0].role}/${res.data[0].name}`);
                    }
                } else {
                    return axios.post('http://localhost:8001/logine', details);
                }
            })
            .then((res) => {
                if (res && res.data && res.data.length > 0) {
                    localStorage.setItem('name', res.data[0].name);
                    localStorage.setItem('role', res.data[0].role);
                    if (res.data[0].role === 'employee') {
                        alert('Employee login successful');
                        nav(`/empdetails/${res.data[0].id}`);
                    }
                }
            })
            .catch((error) => {
                console.error("Error in login request:", error);
            });
    };

    return (
        <div>
            <div id="container">

                <div id="loginbox">
                    <h2>LOGIN</h2>
                    <form method='post' onSubmit={submithandler}>
                        <input type="text" onChange={handler} name="name" autoComplete='none' placeholder='Enter Name' required/>
                        <input type="password" onChange={handler} name="password" placeholder='Enter Password' required/>

                        <button type='submit'>LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    )
}