import React from 'react';
import {
  ButtonDropdown,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button,
} from 'reactstrap';
// import { Link } from 'react-router-dom';
import Ticket from './Ticket';
// import usersData from '../../helpers/data/usersData';
import ticketsData from '../../helpers/data/ticketsData';
import authData from '../../helpers/data/authData';
// import './MyRealTickets.scss';

class MyRealTickets extends React.Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
    dropdownOpen1: false,
    tickets: [],
  }

  toggle = () => {
    const { isOpen } = this.state;
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen });
    this.setState({ isOpen: !isOpen });
  };

  toggle1 = () => {
    const { isOpen } = this.state;
    const { dropdownOpen1 } = this.state;
    this.setState({ dropdownOpen1: !dropdownOpen1 });
    this.setState({ isOpen: !isOpen });
  };

  newTicketEvent = (e) => {
    e.preventDefault();
    // try git info before pass to that page.
    // this.props.history.push(`/newTicket/${'UID or somthing to pass'}`);
    // const birbId = 'birb10000';
    const obj = authData.getUser();
    this.props.history.push(`/newTicket/${obj.uid}`);
    // return <Link to='/newTicket'></Link>;
    // this.props.history.push(`/new/${birbId}`);
  }

  getAllTickets = () => {
    ticketsData.getTicketsByUid(authData.getUid())
      .then((tickets) => {
        this.setState({ tickets });
      })
      .catch((err) => console.error('get tickets broke!!', err));
  };

  componentDidMount() {
    this.getAllTickets();
  }

  sortByNewA = () => {
    const { tickets } = this.state;
    // eslint-disable-next-line no-confusing-arrow
    tickets.sort((a, b) => (a.status > b.status) ? 1 : -1);
    this.setState({ tickets });
    // console.warn('see what have tickets array objext ', tickets);
  };

  sortByNewZ = () => {
    const { tickets } = this.state;
    // tickets.map(e, i) => (index: i, value: e.length);
    // eslint-disable-next-line no-confusing-arrow
    tickets.sort((a, b) => (a.status < b.status) ? 1 : -1);
    this.setState({ tickets });
    // console.warn('see what have tickets array objext ', tickets);
  };

  filterByNew = () => {
    let { tickets } = this.state;
    ticketsData.getTicketsByUid(authData.getUid())
      .then((backtickets) => {
        tickets = backtickets.filter((ticket) => ticket.status === 'New');
        this.setState({ tickets });
      })
      .catch((err) => console.error('get tickets broke!!', err));
  };

  filterByOpen = () => {
    let { tickets } = this.state;
    ticketsData.getTicketsByUid(authData.getUid())
      .then((backtickets) => {
        // eslint-disable-next-line no-undef
        tickets = backtickets.filter((ticket) => ticket.status === 'Open');
        this.setState({ tickets });
      })
      .catch((err) => console.error('get tickets broke!!', err));
  };

  filterByResolved = () => {
    let { tickets } = this.state;
    ticketsData.getTicketsByUid(authData.getUid())
      .then((backtickets) => {
        // eslint-disable-next-line no-undef
        tickets = backtickets.filter((ticket) => ticket.status === 'Resolved');
        this.setState({ tickets });
      })
      .catch((err) => console.error('get tickets broke!!', err));
  };

  deleteTicket = (ticketId) => {
    ticketsData.deleteTicket(ticketId)
      .then(() => this.getAllTickets())
      .catch((err) => console.error(err));
  }

  render() {
    // const { isOpen } = this.state;
    const { tickets } = this.state;
    const ticketsCard = tickets.map((ticket) => <Ticket key={ticket.id} ticket={ticket} deleteTicket={this.deleteTicket}/>);
    return (
      <div className="MyRealTickets">
        <h2> Request Tickets </h2>
        {/* <button className="btn btn-info">I am a button</button> */}
        <ButtonGroup className="mb-2">
          <Button className="btn btn-primary" onClick={this.newTicketEvent}>New Ticket</Button>
          {/* <Link className="btn btn-primary" to='/newTicket'>New Ticket</Link> */}
          {/* <Button>Filter</Button> */}
          <ButtonDropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
            <DropdownToggle caret>
            <i class="fas fa-filter"></i> Filter
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.getAllTickets}>All</DropdownItem>
              <DropdownItem onClick={this.filterByNew}>New</DropdownItem>
              <DropdownItem onClick={this.filterByOpen}>Open</DropdownItem>
              <DropdownItem onClick={this.filterByResolved}>Resolved</DropdownItem>            </DropdownMenu>
          </ButtonDropdown>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            <i class="fas fa-sort-amount-down"></i> Sort By
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.sortByNewA}>Sort By New <i class="fas fa-sort-amount-down-alt"></i></DropdownItem>
              <DropdownItem onClick={this.sortByNewZ}>Sort By New <i class="fas fa-sort-amount-up"></i></DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
        <div className="card-group">
          {ticketsCard}
        </div>
      </div>
    );
  }
}

export default MyRealTickets;

/* didn't work

        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
          <button type="button" className="btn btn-secondary">1</button>
          <button type="button" className="btn btn-secondary">2</button>

          <div className="btn-group" role="group">
            <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <button className="dropdown-item" href="#">Dropdown link</button>
              <button className="dropdown-item" href="#">Dropdown link</button>
            </div>
          </div>
        </div>

*/
