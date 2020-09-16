import React from 'react';
import './KBase.scss';

class KBase extends React.Component {
  render() {
    return (
      <div className="KBase">
        <h2>INSIDE KBase COMPONENT</h2>
        <button className="btn btn-info">I am a button</button>
      </div>
    );
  }
}

export default KBase;
