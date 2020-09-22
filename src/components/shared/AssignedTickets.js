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
    tickets: [],
  }

  getAllTickets = () => {
    console.warn('this is department props', this.props.department);
    ticketsData.getAllTicketByAssignDepartment(this.props.department)
      .then((tickets) => {
        let ticketsAssigned = [];
        // const ticketsAssigned = [];
        // ticketsAssigned.push(backtickets);
        ticketsAssigned = tickets.filter((ticket) => ticket.status === 'Open');
        const openCount = ticketsAssigned.length;
        ticketsAssigned = tickets.filter((ticket) => ticket.status === 'New');
        const newCount = ticketsAssigned.length;
        // this.props.new = tickets.length;
        ticketsAssigned = tickets.filter((ticket) => ticket.status === 'Resolved');
        const resolvedCount = ticketsAssigned.length;
        console.warn('ticket assigned', tickets);
        this.setState({
          openCount,
          newCount,
          resolvedCount,
          tickets,
        });
      })
      .catch((err) => console.error('get tickets broke!!', err));
  };

  componentDidMount() {
    this.getAllTickets();
  }

  constructor(props) {
    super(props);
    // const { resolvedCount, openCount, newCount } = this.state;
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
    const { tickets } = this.state;
    console.warn('ticket assigned array ', tickets.id);
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
