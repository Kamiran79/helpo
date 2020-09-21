import React from 'react';
// import PropTypes from 'prop-types';

import ticketFollowShape from '../../../helpers/propz/ticketFollowShape';
import './FollowTickets.scss';

class FollowTickets extends React.Component {
  static propTypes = {
    ticketFollow: ticketFollowShape.ticketFollowShape,
  }

  render() {
    const { ticketFollow } = this.props;
    // const [{ description }] = ticketFollow;
    const testFollow = () => {
      console.warn('return array ', ticketFollow);
    };
    return (
      <div className="FollowTickets">
        <h2 className="mt-3 details_singleTicket">Replay - Response:</h2>
        <hr />
        <div className="card shadow p-3 mb-3 bg-light rounded">
          <div className="card-body">
            <h5 className="card-title mb-1"><span className="">Response By:</span> Should Replay Name</h5>
            <hr />
            <h6 >Response Details:</h6>
            <p>{ticketFollow}</p>

            {testFollow}
            {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            <p className="card-text pl-2 issueDetails_SingleTicket">{ticketFollow.description}</p>
            {ticketFollow.isImgFollow ? (<img src={ticketFollow.imgUrlFollow} className="card-img-top" alt="" />) : ''} */}
          </div>
        </div>
      </div>
    );
  }
}

export default FollowTickets;
