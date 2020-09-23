import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Chart from 'react-apexcharts';

// import Ticket from './Ticket';

import ticketsData from '../../helpers/data/ticketsData';
// import authData from '../../helpers/data/authData';
// import './MyTickets.scss';

class MyTickets extends React.Component {
  static propTypes = {
    new: PropTypes.number.isRequired,
    department: PropTypes.string.isRequired,
  }

  state = {
    openCount: 0,
    newCount: 0,
    resolvedCount: 0,
    // tickets1: [],
  }

  getAllTickets = () => {
    console.warn('this is department props', this.props.department);
    ticketsData.getAllTicketByAssignDepartment(this.props.department)
      .then((tickets1) => {
        let ticketsAssigned = [];
        // const ticketsAssigned = [];
        // ticketsAssigned.push(backtickets);
        ticketsAssigned = tickets1.filter((ticket) => ticket.status === 'Open');
        const openCount = ticketsAssigned.length;
        ticketsAssigned = tickets1.filter((ticket) => ticket.status === 'New');
        const newCount = ticketsAssigned.length;
        // this.props.new = tickets.length;
        ticketsAssigned = tickets1.filter((ticket) => ticket.status === 'Resolved');
        const resolvedCount = ticketsAssigned.length;
        console.warn('ticket assigned', tickets1[0].author);
        this.setState({
          openCount,
          newCount,
          resolvedCount,
          tickets1,
        });
      })
      .catch((err) => console.error('get tickets broke!!', err));
  };

  componentDidMount() {
    this.getAllTickets();
    // const ticketsCard = this.tickets1.map((ticket) => <Ticket key={ticket.id} ticket={ticket} deleteTicket={this.deleteTicket}/>);
  }

  constructor(props) {
    super(props);
    // const { resolvedCount, openCount, newCount } = this.state;
    ticketsData.getAllTicketByAssignDepartment(this.props.department)
      .then((tickets1) => {
        let ticketsAssigned = [];
        // const ticketsAssigned = [];
        // ticketsAssigned.push(backtickets);
        ticketsAssigned = tickets1.filter((ticket) => ticket.status === 'Open');
        const openCount = ticketsAssigned.length;
        ticketsAssigned = tickets1.filter((ticket) => ticket.status === 'New');
        const newCount = ticketsAssigned.length;
        // this.props.new = tickets.length;
        ticketsAssigned = tickets1.filter((ticket) => ticket.status === 'Resolved');
        const resolvedCount = ticketsAssigned.length;
        console.warn('ticket assigned', tickets1[0].author);
        this.setState({
          openCount,
          newCount,
          resolvedCount,
          // tickets1,
        });
        this.state = {
          tickets: [tickets1],
        };
      })
      .catch((err) => console.error('get tickets broke!!', err));
    // console.warn(resolvedCount, openCount, newCount);
    this.state = {
      options: {
        chart: {
          id: 'apexchart-example',
        },
        xaxis: {
          categories: ['Open', 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [{
        name: 'series-1',
        data: [this.props.new, 4, 1, 2, 1, 3, this.state.newCount, 1],
      }],
    };
  }

  deleteTicket = (ticketId) => {
    ticketsData.deleteTicket(ticketId)
      .then(() => this.getAllTickets())
      .catch((err) => console.error(err));
  }

  render() {
    const { tickets1 } = this.state;
    console.warn('ticket assigned array ', tickets1[0].author);
    /*
    let ticketsCard;
    if (!tickets) {
      ticketsCard = <Ticket key={tickets.id} ticket={tickets} deleteTicket={this.deleteTicket}/>;
    } else {
      ticketsCard = tickets.map((ticket) => <Ticket key={ticket.id} ticket={ticket} deleteTicket={this.deleteTicket}/>);
    }
    // const ticketsCard = tickets.map((ticket) => <Ticket key={ticket.id} ticket={ticket} deleteTicket={this.deleteTicket}/>);
    /*
    let ticketsCard;
    if (!ticketsAssigned) {
      ticketsCard = <Ticket key={ticketsAssigned.id} ticket={ticketsAssigned} deleteTicket={this.deleteTicket}/>;
    } else {
      ticketsCard = ticketsAssigned.map((ticket) => <Ticket key={ticket.id} ticket={ticket} deleteTicket={this.deleteTicket}/>);
    }         {ticketsCard}
    */
    return (
      <div className="MyTickets">
         <Card>
          <Card.Header>Quote link2</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
              <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
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
        <div>

        </div>
      </div>
    );
  }
}

export default MyTickets;
