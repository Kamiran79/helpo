import React from 'react';
// import './NewTicket.scss';

class NewTicket extends React.Component {
  componentDidMount() {
    // const { birbId } = this.props.match.params;
  }

  render() {
    return (
      <div className="NewTicket">
        <h2>INSIDE NewTicket COMPONENT</h2>
        <button className="btn btn-info">I am a button</button>
      </div>
    );
  }
}

export default NewTicket;
