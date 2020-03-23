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
      <Route path="/eat/profile" render={
        () => <Profile user={props.user} updateUser={props.updateUser} />
      } />
     <Route path="/eat/addevent" render={ () => <Addevent user={props.user} response={props.restaurant} /> }/>
     <Route path="/eat/event" render={ () => <Event user={props.user} /> }/>
    </div>
  )
}

export default Content;
