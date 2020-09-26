import React from 'react';
import './KBsingle.scss';

class KBsingle extends React.Component {
  render() {
    return (
      <div className="KBsingle">
        <h2>INSIDE KBsingle COMPONENT</h2>
        <button className="btn btn-info">I am a button</button>
      </div>
    );
  }
}

export default KBsingle;
