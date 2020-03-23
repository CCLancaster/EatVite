import React from 'react'
import { Link, Redirect } from 'react-router-dom'

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
        <Link to="/auth/login">Login</Link>
      </li>
      <li>
        <Link to="/">Signup</Link>
      </li>
    </span>
  )
  
  if(props.user) {
    links = (
      <span>
        <li>Hello {props.user.firstname}!</li>
        <li>
          <Link to="/eat/profile">Profile</Link>
        </li>
        <li>
          <Link to="/" onClick={handleLogout}>Log Out</Link>
        </li>
      </span>
    )
  }
  // TODO: If the user is logged in, show profile page and logout links



  return (
    <div className="navbar">
        <div className="logobox">
            <img src="./eatvitelogo.png" className="logo" alt='logo'/>
        </div>
        <div className="links">
            <ul>
            {links}
            </ul>
        </div>
    </div>
  )
}

export default Nav
