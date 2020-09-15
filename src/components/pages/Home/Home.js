import React from 'react';
import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <h2>INSIDE Home COMPONENT</h2>
        <button className="btn btn-info">I am a button</button>
      </div>
    );
  }
}

export default Home;
