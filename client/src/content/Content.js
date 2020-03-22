import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Addevent from './pages/Addevent';
import Event from './pages/Event';


const Content = props => {
  return (
    <div className="container">
      <Route exact path="/" render={
        () => <Home user={props.user} updateUser={props.updateUser} />
      } />
      <Route path="/auth/login" render={
        () => <Login user={props.user} updateUser={props.updateUser} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} />
      } />
     <Route path="/addevent" render={ () => <Addevent user={props.user} updateUser={props.updateUser} response={props.restaurant} /> }/>
     <Route path="/event/:id" render={ () => <Event /> }/>
    </div>
  )
}

export default Content;
