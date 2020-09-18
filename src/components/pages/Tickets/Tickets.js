import React from 'react';
import Nav from 'react-bootstrap/Nav';
// import Card from 'react-bootstrap/Card';
import './Tickets.scss';
import TicketsDash from '../../shared/TicketsDash';
import MyTickets from '../../shared/MyTickets';
import MyRealTickets from '../../shared/MyRealTickets';

import authData from '../../../helpers/data/authData';
import usersData from '../../../helpers/data/usersData';

class Tickets extends React.Component {
  state = {
    dash: 'link-1',
    tickeLink: 'link1',
    name: '',
    department: '',
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
    const userObj = authData.getUser();
    console.warn('getting user info ', userObj.uid);
    // const uid = authData.getUid;
    usersData.getUserByUid(userObj.uid)
      .then((res) => {
        this.setState({ name: res[0].name, department: res[0].department });
        console.warn('getting user info ', res[0].department);
      })
      .catch((err) => console.warn('get user error ', err));
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

      if (tickeLink === 'link3') {
        return (
          <MyRealTickets {...this.props}/>
          // <MyRealTickets name={this.name} department={this.department}/>
        );
      }

      return <h2> nothing selected </h2>;
    };

    return (
      <div className="Tickets">
        <Nav justify variant="tabs" defaultActiveKey="/link1">
          <Nav.Item>
            <Nav.Link disabled></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/link1" id="link1" onClick={this.eventClick}>Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3" id="link3" onClick={this.eventClick}>My Real Tickets</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" id="link2" onClick={this.eventClick}>My Tickets</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-4">Group Tickets</Nav.Link>
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
