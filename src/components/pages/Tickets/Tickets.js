import React from 'react';
import Nav from 'react-bootstrap/Nav';
// import Card from 'react-bootstrap/Card';
import './Tickets.scss';
import TicketsDash from '../../shared/TicketsDash';
import AssignedTickets from '../../shared/AssignedTickets';
import MyRealTickets from '../../shared/MyRealTickets';

import authData from '../../../helpers/data/authData';
import usersData from '../../../helpers/data/usersData';
// import ticketsData from '../../../helpers/data/ticketsData';
import ticketsData from '../../../helpers/data/ticketsData';

class Tickets extends React.Component {
  state = {
    dash: 'link-1',
    tickeLink: 'link3',
    name: '',
    department: '',
    tickets: [],
    openCount: 0,
    newCount: 0,
    resolvedCount: 0,
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
    this.setState({ dash: 'link1', tickets: [] });
    ticketsData.getTicketsByUid(authData.getUid())
      .then((backtickets) => {
        let tickets1 = [];
        const tickets = backtickets;
        tickets1 = backtickets.filter((ticket) => ticket.status === 'Open');
        const openCount = tickets1.length;
        tickets1 = backtickets.filter((ticket) => ticket.status === 'New');
        const newCount = tickets1.length;
        tickets1 = backtickets.filter((ticket) => ticket.status === 'Resolved');
        const resolvedCount = tickets1.length;
        // const { tickets } = backtickets;
        this.setState({
          openCount,
          newCount,
          resolvedCount,
          tickets,
        });
      })
      .catch((err) => console.error('get tickets broke!!', err));
    const userObj = authData.getUser();
    // console.warn('getting user info ', userObj.uid);
    // const uid = authData.getUid;
    usersData.getUserByUid(userObj.uid)
      .then((res) => {
        this.setState({ name: res[0].name, department: res[0].department });
        // console.warn('getting user info ', res[0].department);
      })
      .catch((err) => console.warn('get user error ', err));
  }

  render() {
    const buildTicket = () => {
      const { tickeLink } = this.state;
      if (tickeLink === 'link1') {
        /* ticketsData.getTicketsByUid(authData.getUid())
          .then((tickets) => {
            console.warn('this return to pas prop ', tickets);
            this.setState({ tickets });
            // const ticketDash = res.map((ticket) => <TicketsDash key={ticket.id} birb={ticket}/>);
          })
          .catch((err) => console.error(err)); */
        return (
          <TicketsDash
            new={this.state.newCount}
            open={this.state.openCount}
            resolved={this.state.resolvedCount}
            tickets={this.state.tickets}
          />
          // ticketDash;
        );
      }

      if (tickeLink === 'link2') {
        return (
          <AssignedTickets new={this.state.newCount} tickets={this.state.tickets} department={this.state.department}/>
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
        <Nav justify variant="tabs" defaultActiveKey="/link3">
          <Nav.Item>
            <Nav.Link disabled></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/link1" id="link1" onClick={this.eventClick}><i class="fas fa-chart-pie"></i> Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3" id="link3" onClick={this.eventClick}><i class="far fa-folder-open"></i> My Requests</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" id="link2" onClick={this.eventClick}><i class="far fa-folder-open"></i> Assigned Tickets</Nav.Link>
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
