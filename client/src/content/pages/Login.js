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
        return <Redirect to="/eat/profile" />
    }

    return (
        <div className="logimg">
            <img src="https://media3.s-nbcnews.com/i/newscms/2018_15/1331889/grilled-chimichurri-soy_steak-today-041618-tease_0c5468b77e1728fa3c7d202d95a76821.jpg" className="steak"/>
            <div className="login">
                <div className="logform">
                    <div>
                        <h2>Login</h2>
                        <form method="POST" onSubmit={handleSubmit}>
                            <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                            <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            <button type="submit">Submit</button>
                        </form>
                        <p>New user?
                        <a href='/' className="red">Sign up here</a></p>
                    </div>
                    <div class="tooltip">Forgot your password?
                        <span class="tooltiptext">Yikes. That sucks.</span>
                    </div>
                </div>
                <div className="welcomeback">
                    <img src="/eatvitelogo.png" className="logo2" />
                    <h3>Let's go decide on something.</h3>
                </div>
            </div>
        </div>
    )
}

export default Login;