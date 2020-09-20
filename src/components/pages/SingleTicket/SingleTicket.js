import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  UncontrolledCollapse,
  Button,
  CardBody,
  Card,
} from 'reactstrap';

import ticketsData from '../../../helpers/data/ticketsData';

import './SingleTicket.scss';
// import ticketsFollowData from '../../../helpers/data/ticketsFollowData';

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

  const buildFollow = () => {
    console.warn('peetite');
    const img = 'this just example to build follow for ticket and kb';
    return (
      <div>mama pia<h1>test</h1>
        <div>{img}</div>
      </div>
    );
  };

  const getFollowTickets = () => {
    console.warn(ticket.author);
    /*
    ticketsFollowData.getTicketsFollowByTickNumber(Number(ticket.ticketNumber))
      .then((res) => {
        console.warn('this follow: ', res);
      })
      .catch((err) => console.error(err));
    */
    return <h1>baaaaa</h1>;
  };

  return (
    <div className="SingleTicket mt-3 p-3 singleTicket_card rounded">
      <h1 className="">Ticket Details</h1>
      {/* <br /><br /> */}
      <hr />
      <h2 className="subject_singleTicket">{ticket.subject} #{ticket.ticketNumber}</h2>
      <Button className="float-left" color="light" id="toggler1" style={{ marginBottom: '1rem' }}>
        <i class="fas fa-caret-down"></i> Dates
      </Button>
      {buildFollow}
      <UncontrolledCollapse toggler="#toggler1">
      <Card className="shadow p-3 mb-3 bg-white rounded">
        <CardBody >
          <div className="row">
            <h5 className="col-10 createdOn_singleTicket">Created on: {moment(ticket.oDate).format('MMM Do YYYY, h:mma')}</h5>
          </div>
          <hr />
          <div className="row">
            <div className="col-6">
              <h5>Last Update: {moment(ticket.uDate).fromNow()}</h5>
            </div>
            <div className="col-6">
              <h5>Close Date: {ticket.cDate ? moment(ticket.cDate).format('MM-DD-YYYY') : '_'}</h5>
            </div>
          </div>
        </CardBody>
      </Card>
    </UncontrolledCollapse>
    <br />
    <br />
    <h2 className="mt-3 details_singleTicket">Details:</h2>
    <hr />
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Created By: {ticket.author}</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">From Department: {ticket.department}</li>
          <li class="list-group-item">Category: {ticket.category}</li>
          <li class="list-group-item">Ticket Assigned to: {ticket.assignTo}</li>
        </ul>
        <hr />
        <h6>Request Details:</h6>
        <p class="card-text pl-2">{ticket.details}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
      <div>
        <img src="" alt="" />
      </div>
    </div>
      <h2>Subject {getFollowTickets()}</h2>
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

/*
          <div class="card border-success mb-3">
              <div class="card-header bg-transparent border-success"></div>
              <div class="card-body text-success">
                <h5 class="card-title">Created on: {moment(ticket.oDate).format('MMM Do YYYY, h:mma')}</h5>
                <p class="card-text">
                  Close Date: {ticket.cDate ? moment(ticket.cDate).format('MM-DD-YYYY') : '_'}</p>
              </div>
              <div class="card-footer bg-transparent border-success">Last Update: {moment(ticket.uDate).fromNow()}</div>
            </div>
*/
