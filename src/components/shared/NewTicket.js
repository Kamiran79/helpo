import React from 'react';
// import './NewTicket.scss';

// I may need install underscore
// import _ from 'underscore';
// new install datePicker from react-datepicker
import DatePicker from 'react-datepicker';
import _ from 'underscore';
// import authData from '../../helpers/data/authData';
import usersData from '../../helpers/data/usersData';
// require the css for that datePicker below:
import 'react-datepicker/dist/react-datepicker.css';

import authData from '../../helpers/data/authData';
import ticketsData from '../../helpers/data/ticketsData';
// create new state for an empty object for that ticket.

// change event for each field to save the value

// create object to take the data from the form and later save it in db (firebase)

// save function for the new object created
// need to get the user id, then save that on database firebase

class NewTicket extends React.Component {
  state = {
    ticketNumber: '',
    cUid: '',
    oDate: new Date(),
    cDate: new Date(),
    author: '',
    department: '',
    category: '',
    toAddress: '',
    assignTo: '',
    subject: '',
    details: '',
    status: 'New',
    priority: '',
    dDate: new Date(),
  }

  changeCategoryEvent = (e) => {
    e.preventDefault();
    this.setState({ category: e.target.value });
  };

  changeToAddressEvent = (e) => {
    e.preventDefault();
    this.setState({ toAddress: e.target.value });
  };

  changeSubjectEvent = (e) => {
    e.preventDefault();
    this.setState({ subject: e.target.value });
  };

  changeDetailsEvent = (e) => {
    e.preventDefault();
    this.setState({ details: e.target.value });
  };

  changePriorityEvent = (e) => {
    e.preventDefault();
    this.setState({ priority: e.target.value });
  };

  oDateEvent = (oDate) => {
    this.setState({ oDate });
  };

  dDateEvent = (dDate) => {
    this.setState({ dDate });
  };

  changeDepartmentEvent = (e) => {
    e.preventDefault();
    this.setState({ department: e.target.value });
  };

  saveNewTicket = (e) => {
    e.preventDefault();
    // get birb items off state
    // create new birb object
    // pass that to a data function
    // do something on save?
    const keysIWant = [
      'ticketNumber',
      'cUid',
      'oDate',
      'cDate',
      'author',
      'department',
      'category',
      'toAdress',
      'assignTo',
      'subject',
      'details',
      'status',
      'priority',
      'dDate',
    ];

    const newTicket = _.pick(this.state, keysIWant);
    newTicket.uid = authData.getUid();

    ticketsData
      .createTicket(newTicket)
      .then((res) => {
        this.props.history.push(`/tickets/${res.data.name}`);
      })
      .catch((err) => console.error('new tickets broke', err));
  };

  componentDidMount() {
    const { uid } = this.props.match.params;
    // const obj = authData.getUser();
    usersData.getUserByUid(uid)
      .then((res) => {
        console.warn('uid ', uid);
        console.warn('user name ', res[0].name);
        this.setState({
          cUid: res[0].uid,
          author: res[0].name,
          department: res[0].department,
        });
      })
      .catch((err) => console.error('read user error ', err));
  }

  render() {
    const {
      // ticketNumber,
      // cUid,
      oDate,
      // cDate,
      author,
      department,
      // forDepartment,
      // category,
      forCategory,
      // toAddress,
      forToAddress,
      // assignTo,
      subject,
      details,
      status,
      // priority,
      forPriority,
      dDate,
    } = this.state;

    // const cat = '';

    return (
      <div className="NewTicket col-12">
        <h2>INSIDE NewTicket COMPONENT</h2>
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="author">Created By</label>
            <input
              type="text"
              className="form-control"
              id="author"
              placeholder={author}
              value={author}
              onChange={this.changeAuthorEvent}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              placeholder="Enter Department"
              value={department}
              onChange={this.changeDepartmentEvent}
              disabled
            />
          </div>
          {/*
          <div class="form-group">
            <label htmlFor="Department">Department</label>
            <select
              value={forDepartment}
              onChange={this.changeDepartmentEvent}
              class="form-control"
              id="department">
              <option>Please Select a Department</option>
              <option value='E12'>E12</option>
              <option value='Developer'>Developer</option>
              <option value='IT'>IT</option>
              <option value='Others'>Others</option>
            </select>
          </div>
          */}

          <div className="form-group">
            <label htmlFor="Category">Category</label>
            <select
              value={forCategory}
              onChange={this.changeCategoryEvent}
              className="form-control"
              id="category">
              <option>Please Select a Category</option>
              <option value='Web'>Web</option>
              <option value='Application'>Application</option>
              <option value='Systems'>Systems</option>
              <option value='Others'>Others</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="To Address">To Address</label>
            <select
              value={forToAddress}
              onChange={this.changeToAddressEvent}
              className="form-control"
              id="toAddress">
              <option>Please Select a Category</option>
              <option value='IT'>IT</option>
              <option value='Developer'>Developer</option>
              <option value='Others'>Others</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="Subject">Subject</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="Enter Subject"
              value={subject}
              onChange={this.changeSubjectEvent}
            />
          </div>

          <div class="form-group">
            <label for="details">Issue details</label>
            <textarea
              class="form-control"
              id="details"
              rows="3"
              placeholder="explain the details issue"
              value={details}
              onChange={this.changeDetailsEvent}>
            </textarea>
          </div>

          <div className="form-group">
            <label htmlFor="status">status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              placeholder="Change the status"
              value={status}
              onChange={this.changeStatusEvent}
              disabled
            />
          </div>

          <div class="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              value={forPriority}
              onChange={this.changePriorityEvent}
              class="form-control"
              id="priority">
              <option>Please Select a Priority</option>
              <option value='Low'>Low</option>
              <option value='Meduim'>Meduim</option>
              <option value='High'>High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="oDate" className="mr-2">
              oDate:{' '}
            </label>
            <DatePicker
              selected={oDate}
              onChange={this.oDateEvent}
              showTimeSelect
            />
          </div>

          <div className="form-group">
            <label htmlFor="dDate" className="mr-2">
              Due Date:{' '}
            </label>
            <DatePicker
              selected={dDate}
              onChange={this.dDateEvent}
              showTimeSelect
            />
          </div>
          <button className="btn btn-warning" onClick={this.saveNewTicket}>
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default NewTicket;

/*

          <div className="form-group">
            <label htmlFor="birbSize">Size</label>
            <input
              type="text"
              className="form-control"
              id="birbSize"
              placeholder="Enter Birb Size"
              value={size}
              onChange={this.changeSizeEvent}
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              placeholder="Enter Birb Department"
              value={altColor}
              onChange={this.changeAltColor}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birbLocation">Location</label>
            <input
              type="text"
              className="form-control"
              id="birbLocation"
              placeholder="Enter Birb Location"
              value={location}
              onChange={this.changeLocation}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birbNotes">Notes</label>
            <input
              type="textarea"
              className="form-control"
              id="birbNotes"
              placeholder="Enter Birb Notes"
              value={notes}
              onChange={this.changeNotesEvent}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birbWasSleeping">Was Sleeping</label>
            <input
              type="checkbox"
              className="form-control"
              id="birbWasSleeping"
              checked={wasSleeping}
              onChange={this.changeWasSleepingEvent}
            />
          </div>

*/
