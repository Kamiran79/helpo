import React from 'react';
import Card from 'react-bootstrap/Card';
// import { Button, CardTitle, CardText, Row, Col } from 'bootstrap';
import Chart from 'react-apexcharts';

// import './TicketsDash.scss';

class TicketsDash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
        </div>
        <Card>
          <Card.Header>Quote This TicketsDash</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <div>
              <Chart options={this.state.options} series={this.state.series} type="pie" width={500} height={320} />
              </div>
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
      </div>
    );
  }
}

export default TicketsDash;
