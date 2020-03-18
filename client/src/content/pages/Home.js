import React from 'react';
import Background from '../../Background';
import Signup from './Signup';

const Home = props => {
  return (
    <div className="bigDaddyContainer">
      <Background />
      <Signup />
      <footer>
      Made with ❤ Connie Lancaster | Danny Goodrich | Thinh Hoang 2020
      </footer>
    </div>
  )
}

export default Home;
