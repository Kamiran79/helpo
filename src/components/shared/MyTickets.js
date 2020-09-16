import React from 'react';
import Card from 'react-bootstrap/Card';
import Chart from 'react-apexcharts';
// import './MyTickets.scss';

class MyTickets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'apexchart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
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
