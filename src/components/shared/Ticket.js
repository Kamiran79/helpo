import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import ticketShape from '../../helpers/propz/ticketShape';

import './Ticket.scss';

class Ticket extends React.Component {
  static propTypes = {
    ticket: ticketShape.ticketShape,
    deleteTicket: PropTypes.func.isRequired,
  }

  deleteTicketEvent = (e) => {
    e.preventDefault();
    const { deleteTicket, ticket } = this.props;
    deleteTicket(ticket.id);
  };

  render() {
    const { ticket } = this.props;

    const getFilterDate = () => {
      let filterDate = '_';
      if (ticket.cDate === '') {
        return filterDate;
      }
      filterDate = moment(ticket.cDate).format('MM-DD-YYYY');
      return filterDate;
    };

    // const filterDate = moment(ticket.uDate).format('MMMM Do YYYY, hh:mm:ss a');
    // if you want only month.day.year
    // moment(ticket.seenAt).format('MM-DD-YYYY')
    const openDate = moment(ticket.oDate).format('MM-DD-YYYY');

    const singleTicketLink = `/singleTicket/${ticket.id}`;
    const editLink = `/edit/${ticket.id}`;
    return (
      <div className="col-12 mb-3">
        <div className="card text-center shadow p-3 mb-3 rounded boarder-0" style={{ background: '#F2AC29' }}>
          <div className="card-header">
            <div className="row">

            </div>
            <div className="float-left">
                <span className={ticket.status}>{ticket.status}</span>
            </div>
            <div className="row"></div>
            <Link to={singleTicketLink} className="btn btn-warning float-right"><i class="far fa-eye"></i></Link>
            <h2>{ticket.subject} #{ticket.ticketNumber}</h2>
            <h4 className="openDate">{openDate}</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-2 my_col">
                <p className="card-text my_header">raised by</p>
                <p className="card-text"><i class="fas fa-user-circle"></i> {ticket.author}</p>
              </div>
              <div className="col-md-2 my_col">
                <p className="card-text my_header">assigned to</p>
                <p className="card-text">{ticket.assignTo}</p>
              </div>
              <div className="col-md-2 my_col">
                <p className="card-text my_header">priority</p>
                <p className="card-text">{ticket.priority}</p>
              </div>
              <div className="col-md-2 my_col">
                <p className="card-text my_header">category</p>
                <p className="card-title">{ticket.category}</p>
              </div>
              <div className="col-md-2 my_col">
                <p className="card-text my_header"><i class="fas fa-calendar-day"></i> Close Date</p>
                <p className="card-text">{getFilterDate()}</p>
              </div>
            </div>

          </div>
          <div className="card-footer text-muted">
            Last Update: {moment(ticket.uDate).fromNow()}
            <Link to={editLink} className="btn btn-success mr-1 float-left"><i className="fas fa-pencil-alt"></i></Link>
            <button className="btn btn-danger float-right" onClick={this.deleteTicketEvent}><i className="fas fa-trash-alt "></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Ticket;

/*
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import ticketShape from '../../../helpers/propz/ticketShape';

const ticketCard = (props) => {
  const { ticket } = props;

  const singleticketLink = `/tickets/${ticket.id}`;
  const editLink = `/edit/${ticket.id}`;

  return (
    <div className="col-4 mb-3">
      <div className="Bird card border-0">
        <div className="card-body">
          <h5 className="card-title">{ticket.type}</h5>
          <p className="card-text">{ticket.notes}</p>
          <Link to={singleticketLink} className="btn btn-warning mr-2"><i className="fas fa-binoculars"></i></Link>
          <Link to={editLink} className="btn btn-success"><i className="fas fa-pencil-alt"></i></Link>
        </div>
        <div className="card-footer text-muted">
          Updated: {moment(ticket.seenAt).fromNow()}
        </div>
      </div>
    </div>
  );
};

ticketCard.propTypes = {
  ticket: ticketShape.ticketShape,
};

export default ticketCard;
*/
