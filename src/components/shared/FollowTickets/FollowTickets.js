import React from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';

import ticketFollowShape from '../../../helpers/propz/ticketFollowShape';
import './FollowTickets.scss';

class FollowTickets extends React.Component {
  static propTypes = {
    ticketFollow: ticketFollowShape.ticketFollowShape,
  }

  render() {
    const { ticketFollow } = this.props;
    // const [{ description }] = ticketFollow;
    // if (!ticketFollow) {
    //  return <div>{ticketFollow}</div>;
    // }
    return (
      <div className="FollowTickets">
        <h2 className="mt-3 details_singleTicket">Replay - Response:</h2>
        <hr />
        <div className="card shadow p-3 mb-3 bg-dark rounded card_replay">
          <div className="card-body">
            <h5 className="card-title mb-1">
              <span className="">
              <i class="fas fa-calendar-day"></i> Replay On:
                </span> {moment(ticketFollow.uDate).format('MM/DD/YYYY, h:mma')} - <i class="fas fa-user-circle"></i> By: {ticketFollow.replayName}</h5>
            <hr />
            <h6 >Response Details:</h6>
            <p>{ticketFollow.description}</p>
            <div>
            {ticketFollow.isImgFollow ? (<img src={ticketFollow.imgUrlFollow} className="card-img-top" alt="" />) : ''}
            </div>
            {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </span> {moment(ticketFollow.dDate).format('MMM Do YYYY, h:mma')} - <i class="fas fa-user-circle"></i> By: {ticketFollow.replayName}</h5>
            <p className="card-text pl-2 issueDetails_SingleTicket">{ticketFollow.description}</p>
             */}
          </div>
        </div>
      </div>
    );
  }
}

export default FollowTickets;
