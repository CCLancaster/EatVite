import React from 'react';

function Signup(props) {
    return (
        <div className="signForm">
            <h4>Save Yourself Some Time And</h4>
            <h2>Sign Up Now</h2>
            <form className="signup" method="POST">
                
                
                <input type="text" name="firstName" placeholder="First Name" />
                <input type="text" name="lastName" placeholder="Last Name" />
                <input type="text" name="email" placeholder="Email" />
                <input type="text" name="password" placeholder="Password" />
                <input type="text" name="phoneNumber" placeholder="Phone Number" />
               
                <button type="submit">Submit</button>
            </form>
            Already have an account?
            <a href=''>Log In Here</a>
        </div>

    )
}

export default Signup;