import React from 'react';

import ticketsData from '../../../helpers/data/ticketsData';
import authData from '../../../helpers/data/authData';

import './Home.scss';

class Home extends React.Component {
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

  render() {
    const { openCount, newCount, resolvedCount } = this.state;
    return (
      <div className="Home">
        <h1>Today</h1>

        <div className="row">
          <div className="col-4">
            <div class="card text-white bg-danger mb-3">
              <div class="card-header">New tickets</div>
              <div class="card-body">
                <h5 class="card-title">{newCount} New</h5>
                <p class="card-text"></p>
              </div>
            </div>
          </div>
          <div className="col-4">
          <div class="card text-white bg-primary mb-3">
              <div class="card-header">Responed Tickets (Opened)</div>
              <div class="card-body">
                <h5 class="card-title">{openCount} Opened</h5>
                <p class="card-text"></p>
              </div>
            </div>
          </div>
          <div className="col-4">
          <div class="card text-white bg-success mb-3">
              <div class="card-header">Resolved Ticktes</div>
              <div class="card-body">
                <h5 class="card-title">{resolvedCount} Resloved</h5>
                <p class="card-text"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div class="card text-white bg-info mb-3">
              <div class="card-header">Knowledge Base Update</div>
              <div class="card-body">
                <h5 class="card-title">Most Pinned Topic</h5>
                <p class="card-text">React Install</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
