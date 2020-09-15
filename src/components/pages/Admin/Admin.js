import React from 'react';
import './Admin.scss';

class Admin extends React.Component {
  render() {
    return (
      <div className="Admin">
        <h2>INSIDE Admin COMPONENT</h2>
        <button className="btn btn-info">I am a button</button>
      </div>
    );
  }
}

export default Admin;
