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
import ticketNumberData from '../../helpers/data/ticketNumberData';
// create new state for an empty object for that ticket.

// change event for each field to save the value

// create object to take the data from the form and later save it in db (firebase)

// save function for the new object created
// need to get the user id, then save that on database firebase

class NewTicket extends React.Component {
  state = {
    ticketNumber: 0,
    cUid: '',
    oDate: new Date(),
    cDate: '',
    uDate: new Date(),
    author: '',
    department: '',
    category: '',
    // toAddress: '',
    assignTo: '',
    subject: '',
    details: '',
    status: 'New',
    priority: '',
    resolution: '',
    dDate: new Date(),
  }

  changeCategoryEvent = (e) => {
    e.preventDefault();
    this.setState({ category: e.target.value });
  };
  /*
  changeToAddressEvent = (e) => {
    e.preventDefault();
    this.setState({ toAddress: e.target.value });
  };
  */

  changeAssignToEvent = (e) => {
    e.preventDefault();
    this.setState({ assignTo: e.target.value });
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
    const ticketNumberUpdate = {
      ticketNumber: 0,
    };

    ticketNumberUpdate.ticketNumber = this.state.ticketNumber + 1;
    console.warn('see the update object tik numb ', ticketNumberUpdate.ticketNumber);
    ticketNumberData.updateTicketNumber('ticketNumber1', ticketNumberUpdate)
      .then()
      .catch((err) => console.error('error to update number ', err));
    /* ticketNumberData.createTicketNumber(ticketNumber)
      .then((res) => {
      })
      .catch((err) => console.error('new tickets Number broke', err)); */
    // pass that to a data function

    // do something on save?
    const keysIWant = [
      'ticketNumber',
      'cUid',
      'oDate',
      'cDate',
      'uDate',
      'author',
      'department',
      'category',
      // 'toAddress',
      'assignTo',
      'subject',
      'details',
      'status',
      'priority',
      'dDate',
      'resolution',
    ];

    const newTicket = _.pick(this.state, keysIWant);
    newTicket.uid = authData.getUid();

    ticketsData
      .createTicket(newTicket)
      .then((res) => {
        this.props.history.push(`/singleTicket/${res.data.name}`);
      })
      .catch((err) => console.error('new tickets broke', err));
  };

  componentDidMount() {
    const { uid } = this.props.match.params;
    // const obj = authData.getUser();
    ticketNumberData.getSingleTicketNumberById('ticketNumber1')
      .then(({ data }) => {
        let { ticketNumber } = this.state;
        ticketNumber = data.ticketNumber;
        console.warn('data is', data);
        console.warn('nu is', ticketNumber);
        this.setState({ ticketNumber });
      })
      .catch((err) => console.error(err));
    // this.setState({ ticketNumber: 0 });
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
      // forToAddress,
      // assignTo,
      forAssignTo,
      subject,
      details,
      // resolution,
      status,
      // priority,
      forPriority,
      dDate,
    } = this.state;

    // const cat = '';

    return (
      <div className="NewTicket col-12">
        <h2 className="float-left">New Ticket</h2>
        <h2 className="float-right">Ticket Details</h2>
        <br />
        <hr />
        <form className="col-8 offset-2">
          <div class="form-row mt-5">
            <div class="form-group col-md-6">
              <label htmlFor="oDate">Open Date: {'  '}</label>
              <DatePicker
                class="form-control"
                selected={oDate}
                onChange={this.oDateEvent}
                showTimeSelect
              />
            </div>
            <div class="form-group col-md-6">
              <label htmlFor="cDate">Close Date: {'  '}</label>
              <DatePicker
                class="form-control"
                onChange={this.cDateEvent}
                showTimeSelect
                disabled
              />
            </div>
          </div>

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
              id="category"
              required>
              <option>Please Select a Category</option>
              <option value='Web'>Web</option>
              <option value='Application'>Application</option>
              <option value='Systems'>Systems</option>
              <option value='Others'>Others</option>
            </select>
          </div>

          {/* Disabled to address same as assign to
          <div className="form-group">
            <label htmlFor="To Address">To Address</label>
            <select
              value={forToAddress}
              onChange={this.changeToAddressEvent}
              className="form-control"
              id="toAddress">
              <option>Please Select a Group</option>
              <option value='IT'>IT</option>
              <option value='Developer'>Developer</option>
              <option value='Others'>Others</option>
            </select>
          </div>
          */}

          <div className="form-group">
            <label htmlFor="Assign To">Assign To</label>
            <select
              value={forAssignTo}
              onChange={this.changeAssignToEvent}
              className="form-control"
              id="toAddress">
              <option>Please Select a Options Below:</option>
              <option value='IT'>IT</option>
              <option value='Developer'>Developer</option>
              <option value='Accounting'>Accounting</option>
              <option value='Engineering'>Engineering</option>
              <option value='Myself'>MySelf</option>
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
              required
            />
          </div>

          <div class="form-group">
            <label htmlfor="details">Issue details</label>
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

/* radio buttons worked with few bugs have to be double click

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="IT"
              onChange={this.changeAssignToEvent}/>
            <label className="form-check-label" htmlFor="inlineRadio1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="MySelf"
              onChange={this.changeAssignToEvent}/>
            <label className="form-check-label" htmlFor="inlineRadio2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled />
            <label className="form-check-label" htmlFor="inlineRadio3">3 (disabled)</label>
          </div>
*/

/* was working just want re-arrange them

            <div className="form-group col-md-3">
              <label htmlFor="oDate" className="">
                Open Date:{' '}
              </label>
              <DatePicker
                selected={oDate}
                onChange={this.oDateEvent}
                showTimeSelect
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="cDate" className="">
                Close Date:{' '}
              </label>
              <DatePicker
                selected={cDate}
                onChange={this.cDateEvent}
                showTimeSelect
              />
            </div>

*/
