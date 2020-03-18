import React from 'react'
import { Link } from 'react-router-dom'

const Nav = props => {
  const handleLogout = e => {
    e.preventDefault()
    // TODO: Remove the token from localstorage (or cookies)
    localStorage.removeItem('mernToken')
    // TODO: Update the state of the App
    props.updateUser();
  }

  let links = (
    <span>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
    </span>
  )
  
  if(props.user) {
    links = (
      <span>
        <li>Hello {props.user.firstname}!</li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/"onClick={handleLogout}>Log Out</Link>
        </li>
      </span>
    )
  }
  // TODO: If the user is logged in, show profile page and logout links

  return (
    <div className="navbar">
        <div className="logobox">
            <img src="./eatvitelogo.png" className="logo" />
        </div>
        <div className="links">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
            {links}
            </ul>
        </div>
    </div>
  )
}

export default Nav
