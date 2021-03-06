/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  UncontrolledCollapse,
  Button,
  CardBody,
  Card,
} from 'reactstrap';

import ticketsData from '../../../helpers/data/ticketsData';

import './SingleTicket.scss';
import ticketsFollowData from '../../../helpers/data/ticketsFollowData';
import FollowTickets from '../../shared/FollowTickets/FollowTickets';
import kbHubData from '../../../helpers/data/kbHubData';
// import smashData from '../../../helpers/data/smashData';

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
  const [responseTicket, setResponseTicket] = useState('');
  const [ticketsFollow, setTicketsFollow] = useState([]);
  // const [ticketsFollowCard, setTicketsFollowCard] = useState({});

  useEffect(() => {
    const { ticketId } = props.match.params;

    const passId = ticketId;
    // const responseToTicket = `responseTicket/${passId}`;
    setResponseTicket(`/responseTicket/${passId}`);

    ticketsFollowData.getTicketsFollowByTicketId(ticketId)
      .then((res) => {
        console.warn('this follow: ', res);
        setTicketsFollow(res);
      })
      .catch((err) => console.error(err));

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

  const createKB = () => {
    const kbObj = {
      uid: ticket.uid,
      topic: ticket.subject,
      status: null,
      department: ticket.assignTo,
      oDate: new Date(),
      isTicket: true,
      imgUrl: ticket.imgUrl,
      isImg: ticket.isImg,
      authorTopic: ticket.author,
      authorKB: 'Kamiran',
    };
    kbHubData.createKB(kbObj)
      .then((res) => {
        this.props.history.push(`/KBSingleT/${res.data.name}`);
      })
      .catch((err) => console.error('new KB broke', err));
  };

  // const responseToTicket = 'responseTicket';
  const ticketsFollowCard = ticketsFollow.map((ticketFollow) => <FollowTickets key={ticketFollow.id} ticketFollow={ticketFollow}/>);

  return (
    <div className="SingleTicket mt-3 p-3 singleTicket_card rounded">
      {ticket.isClose ? (<button disabled className="btn btn-primary float-right" onClick={createKB}> <i className="fas fa-random"></i> Convert to KB</button>) : (<button disabled className="btn btn-warning float-right"> <i className="fas fa-random"></i> Convert to KB</button>)}
      <h1 className="singleTicket_title">Ticket Details</h1>
      {/* <br /><br /> */}
      <hr />
      <h2 className="subject_singleTicket"><i class="fas fa-lightbulb"></i> {ticket.subject} <i class="fas fa-barcode"></i> {ticket.ticketNumber}</h2>
      <Button className="float-left" color="light" id="toggler1" style={{ marginBottom: '1rem' }}>
        <i class="fas fa-caret-down"></i> Dates <i class="fas fa-calendar-alt"></i>
      </Button>
      {buildFollow}
      <UncontrolledCollapse toggler="#toggler1">
        <Card className="shadow p-3 mb-3 bg-light rounded popForm_singleTicket">
          <CardBody >
            <div className="row">
            <span className="fieldName_singleTicket bg-dark"><i class="fas fa-calendar-day"></i> Created on:</span><h5 className="createdOn_singleTicket infoField_singleTicket">{moment(ticket.oDate).format('MMM Do YYYY, h:mma')}</h5>
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <span className="fieldName_singleTicket bg-dark"><i class="fas fa-calendar-day"></i> Last Update: </span>
                  <h5 className="infoField_singleTicket">{moment(ticket.uDate).fromNow()}</h5>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <span className="fieldName_singleTicket bg-dark"><i class="fas fa-calendar-day"></i> Close Date:</span>
                  <h5 className="infoField_singleTicket">{ticket.cDate ? moment(ticket.cDate).format('MM-DD-YYYY') : '_'}</h5>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
      <br />
      <br />
      <h2 className="mt-3 details_singleTicket"><i class="fas fa-file-alt"></i> Details:</h2>
      <hr />
      <div className="card shadow p-3 mb-3 bg-light rounded">
        <div className="card-body">
          <h5 className="card-title mb-1"><span className="fieldName_singleTicket bg-dark"><i class="fas fa-portrait"></i> Created By:</span> {ticket.author}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><span className="font-weight-bold"><i class="far fa-building"></i> Department:</span> {ticket.department}</li>
            <li className="list-group-item"><span className="font-weight-bold"><i class="fas fa-puzzle-piece"></i> Category:</span> {ticket.category}</li>
            <li className="list-group-item"><span className="font-weight-bold"><i class="fas fa-at"></i> Ticket Assigned to:</span> {ticket.assignTo}</li>
          </ul>
          <hr />
          <h6 ><i class="fas fa-exclamation-triangle"></i> Request Details:</h6>
          <p className="card-text pl-2 issueDetails_SingleTicket">{ticket.details}</p>
          {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
          {ticket.isImg ? (<img src={ticket.imgUrl} className="card-img-top" alt="" />) : ''}
        </div>
      </div>
      <Button className="float-left" color="light" id="toggler2" style={{ marginBottom: '1rem' }}>
        <i className="fas fa-caret-down"></i> Status & Schedule <i class="fas fa-shield-alt"></i>
      </Button>
      {buildFollow}
      <UncontrolledCollapse toggler="#toggler2">
        <Card className="shadow p-3 bg-light rounded">
          <CardBody >
            <div className="row">
              <p className="col-10 createdOn_singleTicket"><span className="fieldName_singleTicket bg-dark">Status:</span> {ticket.status}</p>
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <p><span className="fieldName_singleTicket bg-dark"><i class="fas fa-calendar-day"></i> Due Date:</span> {moment(ticket.dDate).format('MMM Do YYYY, h:mma')}</p>
              </div>
              <div className="col-6">
                <p><span className="fieldName_singleTicket bg-dark">priority:</span> {ticket.priority}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
      <br />
      <br />
      <br />
      <div className="card shadow p-3 mb-3 bg-light rounded">
        <div className="card-header font-weight-bold">
        <i class="fas fa-tools"></i> Resolution:
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{ticket.resolution}</p>
            <footer className="blockquote-footer"><cite title="Source Title"></cite></footer>
          </blockquote>
        </div>
      </div>
      <div className="card shadow p-3 mb-3 bg-light rounded">
        <h5 className="card-header"><i class="fas fa-reply"></i> History - Response - Replay :</h5>
        {/* <div className="card-body">
           <h5 className="card-title"></h5>
          <p className="card-text"></p>
        </div>  */}
      </div>
      <div>
        {ticketsFollowCard}
      </div>
      {/*
      <p>Category: {ticket.category}</p>
      <p>Ticket Assigned to: {ticket.assignTo}</p>
      <p>Request Details: {ticket.details}</p>
      <p>Created on: {moment(ticket.oDate).format('MMMY Do YYYY, h:mma')}</p>
      <p>Status: {ticket.status}</p>
      <p>priority: {ticket.priority}</p>
      <p>resolution: {ticket.resolution}</p>
      <p>Due Date: {moment(ticket.dDate).format('MMMY Do YYYY, h:mma')}</p>
      */}

      <Link className="btn btn-primary shadow p-2 mb-3 rounded" to={responseTicket}>Response <i className="fas fa-reply"></i> Replay </Link>
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

/*
      <Button className="float-left" color="light" id="toggler3" style={{ marginBottom: '1rem' }}>
        <i className="fas fa-caret-down"></i> Response <i class="fas fa-reply"></i> Replay
      </Button>
      {/* {ticketsFollow}
      <UncontrolledCollapse toggler="#toggler3">
        <Card className="shadow p-3 bg-light rounded">
          <CardBody >
            <div className="row">
              <p className="col-10 createdOn_singleTicket"><span className="fieldName_singleTicket bg-dark">Response Details:</span> {ticket.status}</p>
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <p><span className="fieldName_singleTicket bg-dark">Due Date:</span> {moment(ticket.dDate).format('MMM Do YYYY, h:mma')}</p>
              </div>
              <div className="col-6">
                <p><span className="fieldName_singleTicket bg-dark">priority:</span> {ticket.priority}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
*/
