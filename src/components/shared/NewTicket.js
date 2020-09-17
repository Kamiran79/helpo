import React from 'react';
// import './NewTicket.scss';

// I may need install underscore
// import _ from 'underscore';
// new install datePicker from react-datepicker
import DatePicker from 'react-datepicker';
// require the css for that datePicker below:
// import 'react-datepicker/dist/react-datepicker.css';

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
    status: '',
    priority: '',
    dDate: new Date(),
  }

  render() {
    const {
      // ticketNumber,
      // cUid,
      oDate,
      // cDate,
      author,
      // department,
      category,
      // toAddress,
      // assignTo,
      // subject,
      // details,
      // status,
      // priority,
      // dDate,
    } = this.state;

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
              placeholder=""
              value={author}
              onChange={this.changeAuthorEvent}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              placeholder="select category"
              value={category}
              onChange={this.changeCategoryEvent}
            />
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
          <button className="btn btn-warning" onClick={this.saveBirb}>
            Save Birb
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
            <label htmlFor="birbAltColor">Alt Color</label>
            <input
              type="text"
              className="form-control"
              id="birbAltColor"
              placeholder="Enter Birb Alt Color"
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
