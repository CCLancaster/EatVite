import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'

function Login(props) {
    // Declare and initialize state variables
    let [email, setEmail] = useState('')
    let [message, setMessage] = useState('')
    let [password, setPassword] = useState('')
        
    useEffect(() => {
        setMessage("")
    }, [email, password] )

    const handleSubmit = e => {
        e.preventDefault()
        // TODO: Send the user sign up data to the server
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => {
        if (!response.ok) {
            console.log(response);
            setMessage(`${response.status}: ${response.statusText}`);
            return;
        }

        // if user signed up successfully
        response.json().then(result => {
            props.updateUser(result.token);
        })

        })     
    }

    if (props.user) {
        return <Redirect to="/profile" />
    }

    return (
        <div>
            <h2>Login</h2>
            <form className="lgoin" method="POST" onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input type="text" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
               
                <button type="submit">Submit</button>
            </form>
            New user?
            <a href=''>Sign up here</a>
        </div>
    )
}

export default Login;