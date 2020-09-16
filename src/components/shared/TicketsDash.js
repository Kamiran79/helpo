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
          <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Tickets by Status</h5>
                  <Chart options={this.state.options} series={this.state.series} type="pie" width={500} height={320} />
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Tickets by Priority</h5>
                  <Chart options={this.state.options} series={this.state.series} type="pie" width={500} height={320} />
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                </div>
              </div>
            </div>
          </div>
        </div>
        <Card>
          <Card.Header>Tickets by All Groups (Departments)</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <div className="col-12 offset-3">
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
