import React from 'react';

function Login(props) {
    return (
        <div className='logform'>
            <h1> Login</h1>
            <form className='login' method='POST'>
                <input type='text' name='email'  placeholder='Email' />
                <input type='text' name='password'  placeholder='Password' />
                <button type='submit'>Submit</button>
            </form>
        </div>

    )
}

export default Login;