import React from 'react';
// import './NewTicket.scss';
import firebase from 'firebase/app';
import 'firebase/storage';
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
// import ticketsFollowData from '../../helpers/data/ticketsFollowData';
// import ticketsImgData from '../../helpers/data/ticketsImgData';
// create new state for an empty object for that ticket.

// change event for each field to save the value

// create object to take the data from the form and later save it in db (firebase)

// save function for the new object created
// need to get the user id, then save that on database firebase

class NewTicket extends React.Component {
  allInput = { imgUrl1: '' };

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
    // imgUrl: '',
    isImgAttached: false,
    imageAsFile: '',
    imageAsUrl: '',
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

  myImges = '';

  setImge = (imgUrl) => {
    const img = imgUrl;
    console.warn(img);
    this.allInput.imgUrl1 = img;
    // this.setState({ imgUrl });
    return img;
  };

  saveNewTicket = (e) => {
    e.preventDefault();
    // const imgUrl, isImg } = this.state;
    // let isImg = false;
    if (this.state.imageAsFile !== '') {
      const storageRef = firebase.storage().ref(`ticketsImg/${this.state.imageAsFile}`);
      storageRef.getDownloadURL().then((url) => {
        console.warn('this is the url for the image ', url);
        // let imgUrl = '';
        // let isImg = false;
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
        newTicket.isClose = false;
        if (url !== '') {
          // this.setImge(url);
          // this.myImges = url;
          newTicket.imgUrl = url;
          newTicket.isImg = true;
          ticketsData.createTicket(newTicket)
            .then((res) => {
              this.props.history.push(`/singleTicket/${res.data.name}`);
            })
            .catch((err) => console.error('new tickets broke', err));
          // isImg = true;
          // this.state.imageAsUrl((prevObject) => ({ ...prevObject, imgUrl: url }));
          // this.allInput.imgUrl = url;
          // imgUrl = url;
          // this.setState({ imgUrl: url });
          // this.setState({ isImg: true });
          // console.warn('access to add object and url is ', this.state.imageAsUrl);
          /*
          const follow = 1;
          const newTicketFollow = {
            ticketId: '',
            ticketNumber: this.state.ticketNumber,
            uid: this.state.cUid,
            followNumber: follow,
            uDate: this.state.oDate,
            responseName: this.state.author,
            imgUrl: url,
            isImg: true,
            description: 'first attached file for the issue',
            linkRef: 'this.state.imageAsUrl',
          };
          ticketsFollowData.createTicketFollow(newTicketFollow)
            .then()
            .catch((err) => console.error(err));
          */
        } else {
          newTicket.imgUrl = '';
          newTicket.isImg = false;
          ticketsData.createTicket(newTicket)
            .then((res) => {
              this.props.history.push(`/singleTicket/${res.data.name}`);
            })
            .catch((err) => console.error('new tickets broke', err));
          console.warn('failure to upload ?? url is ', this.state.imageAsUrl);
        }
        // this.setState({ imageAsUrl: url });
      });
    } else {
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
      newTicket.isClose = false;
      newTicket.imgUrl = '';
      newTicket.isImg = false;
      ticketsData.createTicket(newTicket)
        .then((res) => {
          this.props.history.push(`/singleTicket/${res.data.name}`);
        })
        .catch((err) => console.error('new tickets broke', err));
    }

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
    // console.warn('what is in myImages have: ', this.myImges);
    // console.warn('access to add object and url is ', this.allInput);
    // const { imgUrl } = this.state;
    // if (imgUrl !== '') {
    // const imgUrl = this.allInput.imgUrl1;
    // this.setState({ imgUrl });
    // const isImg = true;
    // this.setState({ isImg });
    //  console.warn('image updated', imgUrl);
    // }
    // console.warn('image updated', imgUrl);
    /*
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

    ticketsData.createTicket(newTicket)
      .then((res) => {
        this.props.history.push(`/singleTicket/${res.data.name}`);
      })
      .catch((err) => console.error('new tickets broke', err));
    */
  };

  componentDidMount() {
    const { uid } = this.props.match.params;
    // const obj = authData.getUser();
    // this.setImge();
    const imgUrl = '';
    this.setState({ imgUrl });
    ticketNumberData.getSingleTicketNumberById('ticketNumber1')
      .then(({ data }) => {
        let { ticketNumber } = this.state;
        ticketNumber = data.ticketNumber;
        // console.warn('data is', data);
        // console.warn('nu is', ticketNumber);
        this.setState({ ticketNumber });
      })
      .catch((err) => console.error(err));
    // this.setState({ ticketNumber: 0 });
    usersData.getUserByUid(uid)
      .then((res) => {
        // console.warn('uid ', uid);
        // console.warn('user name ', res[0].name);
        this.setState({
          cUid: res[0].uid,
          author: res[0].name,
          department: res[0].department,
        });
      })
      .catch((err) => console.error('read user error ', err));
  }

  uploadImage = () => {
    const file = document.getElementById('ticket-image').files[0];
    const image = file.name;
    // const { imageAsFile } = this.state;
    this.setState({ imageAsFile: image });
    console.warn('image file name ', image);
    firebase.storage().ref(`ticketsImg/${image}`).put(file).then(() => {});
  };

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
      // imageAsFile,
    } = this.state;

    // const cat = '';
    // const storage = firebase.storage();

    return (
      <div className="NewTicket col-12">
        <h2 className="float-left">New Ticket</h2>
        <h2 className="float-right">Ticket Details</h2>
        <br />
        <hr />
        <form className="col-8 offset-2 shadow p-3 bg-primary mb-3 rounded">
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
            <label htmlFor="author"><i class="fas fa-portrait"></i> Created By</label>
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
            <label htmlFor="department"><i class="far fa-building"></i> Department</label>
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
            <label htmlFor="Assign To"><i class="fas fa-at"></i> Assign To</label>
            <select
              value={forAssignTo}
              onChange={this.changeAssignToEvent}
              className="form-control"
              id="toAddress">
              <option>Please Select a Options Below:</option>
              <option value='IT'>IT</option>
              <option value='E11'>E11</option>
              <option value='E12'>E12</option>
              <option value='E13'>E13</option>
              <option value='Developer'>Developer</option>
              <option value='Accounting'>Accounting</option>
              <option value='Engineering'>Engineering</option>
              <option value='Myself'>MySelf</option>
              <option value='Others'>Others</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="Subject"><i class="fab fa-ethereum"></i> Subject</label>
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
            <label htmlfor="details"><i class="fas fa-exclamation-triangle"></i> Issue details</label>
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
            <label htmlFor="status"><i class="fas fa-shield-alt"></i> status</label>
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
          <input
            className="btn btn-warning float-left"
            type="file"
            id="ticket-image"
            onChange={this.uploadImage}
          />
          <button className="btn btn-warning float-right" onClick={this.saveNewTicket}>
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

/*

  handleFireBaseUpload = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    this.setState({ image });
    console.warn('start of upload');
    // async magic goes here...
    const storage = firebase.storage();
    const { imageAsFile } = this.state;
    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
    }
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
    // initiates the firebase side uploading
    uploadTask.on('state_changed',
      (snapShot) => {
        // takes a snap shot of the process as it is happening
        console.warn(snapShot);
      }, (err) => {
      // catches the errors
        console.warn(err);
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(imageAsFile.name).getDownloadURL()
          .then((fireBaseUrl) => {
            this.setState((prevObject) => ({ ...prevObject, imgUrl: fireBaseUrl }));
          })
          .catch((err) => console.error(err));
      });
  };
*/
