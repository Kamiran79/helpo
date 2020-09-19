import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Chart from 'react-apexcharts';

import ticketsData from '../../helpers/data/ticketsData';
import authData from '../../helpers/data/authData';
// import './MyTickets.scss';

class MyTickets extends React.Component {
  static propTypes = {
    new: PropTypes.number.isRequired,
  }

  state = {
    openCount: 0,
    newCount: 0,
    resolvedCount: 0,
  }

  getAllTickets = () => {
    ticketsData.getTicketsByUid(authData.getUid())
      .then((backtickets) => {
        let tickets = [];
        tickets = backtickets.filter((ticket) => ticket.status === 'Open');
        const openCount = tickets.length;
        tickets = backtickets.filter((ticket) => ticket.status === 'New');
        const newCount = tickets.length;
        tickets = backtickets.filter((ticket) => ticket.status === 'Resolved');
        const resolvedCount = tickets.length;

        this.setState({ openCount, newCount, resolvedCount });
      })
      .catch((err) => console.error('get tickets broke!!', err));
  };

  componentDidMount() {
    this.getAllTickets();
  }

  constructor(props) {
    super(props);
    const { resolvedCount, openCount, newCount } = this.state;
    console.warn(resolvedCount, openCount, newCount);
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
        data: [this.props.new, 4, 1, 2, 1, 3, 0, 1],
      }],
    };
  }

  render() {
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
      </div>
    );
  }
}

export default MyTickets;
