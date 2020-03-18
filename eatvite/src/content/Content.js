import React from 'react'
import { Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'


const Content = props => {
  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/login" render={
        () => <Login user={props.user} updateUser={props.updateUser} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} />
      } />
     
    </div>
  )
}

export default Content;
