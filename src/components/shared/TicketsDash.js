import React from 'react';
import PropTypes from 'prop-types';
// import Card from 'react-bootstrap/Card';
// import { Button, CardTitle, CardText, Row, Col } from 'bootstrap';
import Chart from 'react-apexcharts';

import ticketsData from '../../helpers/data/ticketsData';
import authData from '../../helpers/data/authData';
// import './TicketsDash.scss';

class TicketsDash extends React.Component {
  static propTypes = {
    new: PropTypes.number.isRequired,
    open: PropTypes.number.isRequired,
    resolved: PropTypes.number.isRequired,
    pending: PropTypes.number.isRequired,
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

  state = {
    openCount: 0,
    newCount: 0,
    resolvedCount: 0,
  }

  componentDidMount() {
    this.getAllTickets();
  }

  constructor(props) {
    super(props);
    // const { resolvedCount, openCount, newCount } = this.state;
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
    this.state = {
      series: [this.props.resolved, this.props.open, this.props.pending, this.props.new],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Open', 'Resolved', 'Pending', 'New'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        }],
      },
      series2: [this.props.resolved, this.props.open, 4, this.props.new],
      options2: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Meduim', 'Low', 'High', 'Urgent'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        }],
      },
    };
  }

  render() {
    return (
      <div className="TicketsDash">
        <div className="container">
          <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Tickets by Status</h5>
                  <Chart options={this.state.options} series={this.state.series} type="pie" width={500} height={320} />
                  <p class="card-text"></p>

                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Tickets by Priority</h5>
                  <Chart options={this.state.options2} series={this.state.series2} type="pie" width={500} height={320} />
                  <p class="card-text"></p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketsDash;

/*
        <Card>
          <Card.Header>Tickets by All Groups (Departments)</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <div className="col-12 offset-3">
              <Chart options={this.state.options} series={this.state.series} type="pie" width={500} height={320} />
              </div>
              <p>
                {' '}
                {' '}
              </p>
              <footer className="blockquote-footer">
                 <cite title="Source Title"></cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
*/
