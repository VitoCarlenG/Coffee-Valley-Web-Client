import '../App.css';
import cv from '../assets/cv.png'
import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'


function Login() {
    const [userId, setUserId] = useState(1)
    const [userPassword, setUserPassword] = useState("")

    const getUserId = (e) => {
        setUserId(e.target.value)
    }

    const getUserPassword = (e) => {
        setUserPassword(e.target.value)
    }

    const loginUser= (e) => {
        e.preventDefault()

        axios.post(`http://localhost:3001/login`, {
            id: userId,
            password: userPassword
        })
        .then(async res => {
            console.log(res)

            if(!res.data.user) {
                await Swal.fire(res.data.message);
            } else {
                await Swal.fire("Login Success");

                sessionStorage.setItem('id', userId);

                window.location.replace('/');
            }
        })
    }
    
    return (
        <div className="App">
        <header className="App-header">
            <img src={cv} className="App-logo" alt="logo" />

            <br />

            <Form onSubmit={loginUser}>
                <InputGroup>
                    <InputGroup.Text id="inputGroup-sizing-default">
                        User ID
                    </InputGroup.Text>
                    <Form.Control
                    placeholder="Input User's ID"
                    value={userId}
                    onChange={getUserId}
                    />
                </InputGroup>

                <br />

                <InputGroup>
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Password
                    </InputGroup.Text>
                    <Form.Control
                    placeholder="Input User's Password"
                    type='password'
                    value={userPassword}
                    onChange={getUserPassword}
                    />
                </InputGroup>

                <br />

                <Button variant="secondary" type="submit">
                        Login
                </Button>
            </Form>
        </header>
        </div>
    );
}

export default Login;
