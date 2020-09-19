import React, { useState, useEffect } from 'react';
import moment from 'moment';

import ticketsData from '../../../helpers/data/ticketsData';

import './SingleTicket.scss';

/*
class SingleTicket extends React.Component {
  state = {
    Ticket: {},
  }

  componentDidMount() {
    const { TicketId } = this.props.match.params;

    ticketsData.getSingleTicketById(TicketId)
      .then((res) => this.setState({ Ticket: res.data }))
      .catch((err) => console.error('get single Ticket broke ', err));
  }

  render() {
    const { Ticket } = this.state;
    return (
      <div className="SingleTicket">
        <h1>SingleTicket</h1>
        <h4>{Ticket.type}</h4>
      </div>
    );
  }
}
*/
const SingleTicket = (props) => {
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    const { ticketId } = props.match.params;

    ticketsData.getSingleTicketById(ticketId)
      .then((res) => setTicket(res.data))
      .catch((err) => console.error('get single Ticket failed ', err));
  }, [props.match.params]);

  const deleteSingleTicket = () => {
    console.warn('excute that delete Ticket');
    const { ticketId } = props.match.params;

    ticketsData.deleteTicket(ticketId)
      .then(() => props.history.push('/home'))
      .catch((err) => console.error(err));
  };

  return (
    <div className="SingleTicket mt-3 p-3 singleTicket_card rounded">
      <h1>Ticket Details</h1>
      <h2>Subject {ticket.subject}</h2>
      <p>Category: {ticket.category}</p>
      <p>Ticket Assigned to: {ticket.assignTo}</p>
      <p>Request Details: {ticket.details}</p>
      <p>Created on: {moment(ticket.oDate).format('MMMY Do YYYY, h:mma')}</p>
      <p>Status: {ticket.status}</p>
      <p>priority: {ticket.priority}</p>
      <p>resolution: {ticket.resolution}</p>
      <p>Due Date: {moment(ticket.dDate).format('MMMY Do YYYY, h:mma')}</p>
      <button className="btn btn-danger col-12" onClick={deleteSingleTicket}><i className="fas fa-trash-alt "></i></button>
    </div>
  );
};

export default SingleTicket;
