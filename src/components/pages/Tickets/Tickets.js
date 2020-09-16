import React from 'react';
import Nav from 'react-bootstrap/Nav';
// import Card from 'react-bootstrap/Card';
import './Tickets.scss';
import TicketsDash from '../../shared/TicketsDash';
import MyTickets from '../../shared/MyTickets';

class Tickets extends React.Component {
  state = {
    dash: 'link-1',
    tickeLink: 'link1',
  }

  updateTickets = (select) => {
    this.setState({ tickeLink: select });
  };

  eventClick = (e) => {
    e.preventDefault();
    const selected = e.target.id;
    this.updateTickets(selected);
  };

  componentDidMount() {
    this.setState({ dash: 'link1' });
  }

  render() {
    const buildTicket = () => {
      const { tickeLink } = this.state;
      if (tickeLink === 'link1') {
        return (
          <TicketsDash />
        );
      }

      if (tickeLink === 'link2') {
        return (
          <MyTickets />
        );
      }

      return <h2> nothing selected </h2>;
    };

    return (
      <div className="Tickets">
        <Nav justify variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" id="link1" onClick={this.eventClick}>Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" id="link2" onClick={this.eventClick}>My Tickets</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3">Group Tickets</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
            Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {buildTicket()}
      </div>
    );
  }
}

export default Tickets;
