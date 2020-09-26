import React from 'react';
import './Land.scss';

class Land extends React.Component {
  render() {
    return (
      <div className="Land">
        <h2 className="target_h2_Land line anim-typewriter">INSIDE Land COMPONENT</h2>
        <button className="btn btn-info">I am a button</button>
      </div>
    );
  }
}

export default Land;
