import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import './Tickets.scss';

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
          <Card>
          <Card.Header>Quote {eventTicketsNav}</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                erat a ante.{' '}
              </p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
        );
      }

      if (tickeLink === 'link2') {
        return (
          <Card>
          <Card.Header>Quote link2</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                erat a ante.{' '}
              </p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
        );
      }

      return <h2> nothing selected </h2>;
    };
    const eventTicketsNav = (e) => {
      console.warn(e.target.Link);
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
