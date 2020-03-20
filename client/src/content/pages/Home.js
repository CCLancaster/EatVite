import React from 'react';
import Background from '../../Background';
import Signup from './Signup';

const Home = props => {
  return (
    <div className="bigDaddyContainer">
      <Background />
      <Signup user={props.user} updateUser={props.updateUser}/>
    </div>
  )
}

export default Home;
