import React from 'react';
// import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/storage';
import DatePicker from 'react-datepicker';
import _ from 'underscore';

import authData from '../../../helpers/data/authData';
import ticketsFollowData from '../../../helpers/data/ticketsFollowData';
import ticketsData from '../../../helpers/data/ticketsData';
import usersData from '../../../helpers/data/usersData';

import 'react-datepicker/dist/react-datepicker.css';
import './ResponseTickets.scss';

class ResponseTickets extends React.Component {
  state = {
    ticketNumber: 0,
    cUid: '',
    oDate: new Date(),
    cDate: new Date(),
    uDate: new Date(),
    author: '',
    department: '',
    category: '',
    assignTo: '',
    subject: '',
    details: '',
    status: 'Open',
    priority: '',
    resolution: '',
    dDate: new Date(),
    replayName: '',
    imgUrl: '',
    isImg: '',
    description: '',
    isClose: '',
    followNumber: 0,
    imgUrlFollow: '',
    isImgFollow: false,
    imageAsFile: '',
    imageAsUrl: '',
    myTest: '',
    myUrl: '',
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

  changeStatusEvent = (e) => {
    e.preventDefault();
    if (e.target.value === 'Resloved') {
      const isClose = true;
      this.setState({ status: e.target.value, isClose, cDate: new Date() });
      console.warn('test the is close working or not ', isClose);
    }
    this.setState({ status: e.target.value, cDate: '' });
  };

  changeDescriptionEvent = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  };

  changePriorityEvent = (e) => {
    e.preventDefault();
    this.setState({ priority: e.target.value });
  };

  uDateEvent = (uDate) => {
    this.setState({ uDate });
  };

  dDateEvent = (dDate) => {
    this.setState({ dDate });
  };

  changeResolutionEvent = (e) => {
    e.preventDefault();
    this.setState({ resolution: e.target.value });
  };

  componentDidMount() {
    const { ticketId } = this.props.match.params;
    const myTest = ticketId;
    this.setState({ myTest });
    console.warn('inside mount before call ticket');
    ticketsData.getSingleTicketById(ticketId)
      .then(({ data }) => {
        console.warn('calling ticket and data', data);
        this.setState({
          assignTo: data.assignTo,
          author: data.author,
          cDate: new Date(data.cDate),
          cUid: new Date(data.cUid),
          category: data.category,
          dDate: new Date(data.dDate),
          department: data.department,
          details: data.details,
          imgUrl: data.imgUrl,
          isClose: data.isClose,
          isImg: data.isImg,
          oDate: new Date(data.oDate),
          priority: data.priority,
          resolution: data.resolution,
          status: data.status,
          subject: data.subject,
          ticketNumber: data.ticketNumber,
          uDate: new Date(),
          uid: data.uid,
        });
      })
      .catch((err) => console.error('get ticket by id faild ', err));
    usersData.getUserByUid(authData.getUid())
      .then((res) => {
        // console.warn('uid ', uid);
        // console.warn('user name ', res[0].name);
        this.setState({
          replayName: res[0].name,
          // department: res[0].department,
        });
      })
      .catch((err) => console.error('read user error ', err));
  }

  saveFollowTicket = (e) => {
    e.preventDefault();
    console.warn('access to saveFollow');
    const { isImgFollow } = this.state;
    console.warn('see if that updated isImg ', isImgFollow);
    const { ticketId } = this.props.match.params;
    // const imgUrl, isImg } = this.state;
    // let isImg = false;
    console.warn('access to saveFollow before checking image');
    if (isImgFollow) {
      const storageRef = firebase.storage().ref(`ticketsImg/${this.state.imageAsFile}`);
      storageRef.getDownloadURL().then((url) => {
        console.warn('this is the url for the image ', url);
        console.warn('access to saveFollow should now got URL if there is any');
        // let imgUrl = '';
        // let isImg = false;
        const keysIWantFollow = [
          'ticketNumber',
          'uDate',
          'replayName',
          'description',
          'imgUrlFollow',
          'isImgFollow',
          'uid',
        ];
        const newTicketFollow = _.pick(this.state, keysIWantFollow);
        newTicketFollow.uid = authData.getUid();
        newTicketFollow.ticketId = ticketId;
        if (url !== '') {
          newTicketFollow.imgUrlFollow = url;
          newTicketFollow.isImgFollow = true;
          ticketsFollowData.createTicketFollow(newTicketFollow)
            .then()
            .catch((err) => console.error(err));
        } else {
          newTicketFollow.imgUrl = '';
          newTicketFollow.isImg = false;
          ticketsFollowData.createTicketFollow(newTicketFollow)
            .then()
            .catch((err) => console.error(err));
          console.warn('failure to upload ?? url is ', this.state.imageAsUrl);
        }
        // this.setState({ imageAsUrl: url });
      });
    } else {
      const keysIWantFollow = [
        'ticketNumber',
        'uDate',
        'replayName',
        'description',
        'imgUrlFollow',
        'isImgFollow',
        'uid',
      ];
      const newTicketFollow = _.pick(this.state, keysIWantFollow);
      newTicketFollow.uid = authData.getUid();
      newTicketFollow.ticketId = ticketId;
      newTicketFollow.imgUrl = '';
      newTicketFollow.isImg = false;
      ticketsFollowData.createTicketFollow(newTicketFollow)
        .then()
        .catch((err) => console.error(err));
    }

    console.warn('should complished save follow next update ticket');
    const cdate = new Date();
    let isClose = false;
    if (this.state.status === 'Resolved') {
      this.setState({ cdate });
      isClose = true;
    }

    const keysIWant = [
      'ticketNumber',
      'cUid',
      'oDate',
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
      'imgUrl',
      'isImg',
      'isClose',
      'uid',
    ];

    const editedTicket = _.pick(this.state, keysIWant);
    editedTicket.cDate = new Date();
    editedTicket.isClose = isClose;
    ticketsData.updateTicket(ticketId, editedTicket)
      .then((res) => {
        console.warn('should updated that ticket about to go display ticket', res.data.name);
        this.props.history.push(`/singleTicket/${ticketId}`);
      })
      .catch((err) => console.error('new tickets broke', err));
  };

  uploadImage = () => {
    const file = document.getElementById('ticket-image').files[0];
    const image = file.name;
    // const { imageAsFile } = this.state;
    this.setState({ imageAsFile: image });
    console.warn('image file name ', image);
    firebase.storage().ref(`ticketsImg/${image}`).put(file).then((res) => {
      // const { bucket, path } = res.ref.location;
      const storageRef = firebase.storage().ref(`ticketsImg/${this.state.imageAsFile}`);
      storageRef.getDownloadURL().then((url) => {
        const myUrl = url;
        this.setState({ myUrl });
        // const url = `${bucket}/${path}`;
        // console.warn('bucket', bucket, path);
        // console.warn('url', url);
        const isImgFollow = true;
        this.setState({ isImgFollow });
        console.warn(this.state.myUrl);
        console.warn(this.state.isImgFollow);
      });
      // Put code here that getes executed after image is saved
    });

    // const storageRef = firebase.storage().ref(`ticketsImg/${image}`);
    // storageRef.getDownloadURL().then((url) => {
    //   console.warn('this is the url for the image ', url);
    // });
  };

  render() {
    const {
      // ticketNumber,
      // cUid,
      oDate,
      // cDate,
      uDate,
      author,
      department,
      // forDepartment,
      category,
      // forCategory,
      // toAddress,
      // forToAddress,
      assignTo,
      // forAssignTo,
      subject,
      details,
      resolution,
      status,
      // forStatus,
      priority,
      forPriority,
      dDate,
      // imageAsFile,
      description,
    } = this.state;
    return (
      <div className="NewTicket col-12">
        <h2 className="float-left singleTicket_title">Response Ticket</h2>
        <h2 className="float-right singleTicket_title">Replay to Ticket </h2>
        <br />
        <hr />
        <form className="col-8 offset-2 shadow p-3 bg-info mb-3 rounded">
          <div class="form-row mt-5">
            <div class="form-group col-md-6">
              <label htmlFor="oDate"><i class="fas fa-calendar-alt"></i> Open Date: {'  '}</label>
              <DatePicker
                class="form-control"
                selected={oDate}
                onChange={this.oDateEvent}
                showTimeSelect
                disabled
              />
            </div>
            <div class="form-group col-md-6">
              <label htmlFor="uDate"><i class="fas fa-calendar-alt"></i> Update Date: {'  '}</label>
              <DatePicker
                class="form-control"
                selected={uDate}
                onChange={this.uDateEvent}
                showTimeSelect
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
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
            </div>
            <div className="col-md-6">
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
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Category"><i class="fas fa-puzzle-piece"></i> Category</label>
                <select
                  value={category}
                  onChange={this.changeCategoryEvent}
                  className="form-control"
                  id="category"
                  required>
                  <option value={category}>{category}</option>
                  <option value='Web'>Web</option>
                  <option value='Application'>Application</option>
                  <option value='Systems'>Systems</option>
                  <option value='Others'>Others</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Assign To"><i class="fas fa-at"></i> Assign To</label>
                <select
                  value={assignTo}
                  onChange={this.changeAssignToEvent}
                  className="form-control"
                  id="toAddress">
                  <option>Please Select a Options Below:</option>
                  <option value={assignTo}>{assignTo}</option>
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
            </div>
          </div>

          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6"></div>
          </div>

          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6"></div>
          </div>

          <div className="form-group">
            <label htmlFor="Subject"><i class="fab fa-ethereum"></i> Subject</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="Enter Subject"
              value={subject}
              disabled
              onChange={this.changeSubjectEvent}
              required
            />
          </div>

          <div class="form-group">
            <label htmlfor="details"><i class="fas fa-exclamation-triangle"></i>Issue details</label>
            <textarea
              class="form-control"
              id="details"
              rows="3"
              placeholder="explain the details issue"
              value={details}
              disabled
              onChange={this.changeDetailsEvent}>
            </textarea>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="status"><i class="fas fa-shield-alt"></i> status</label>
                <select
                  value={status}
                  onChange={this.changeStatusEvent}
                  class="form-control"
                  id="status">
                  <option value={status}>{status}</option>
                  <option value='Open'>Open</option>
                  <option value='Pending'>Pending</option>
                  <option value='Resolved'>Resolved</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div class="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  value={forPriority}
                  onChange={this.changePriorityEvent}
                  class="form-control"
                  id="priority">
                  <option value={priority}>{priority}</option>
                  <option value='Low'>Low</option>
                  <option value='Meduim'>Meduim</option>
                  <option value='High'>High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dDate" className="mr-2">
            <i class="fas fa-calendar-alt"></i> Due Date:{' '}
            </label>
            <DatePicker
              selected={dDate}
              onChange={this.dDateEvent}
              showTimeSelect
            />
          </div>

          <div class="form-group">
            <label htmlfor="details"><i class="fas fa-reply"></i> Response Notes</label>
            <textarea
              class="form-control"
              id="details"
              rows="3"
              placeholder="Your response or any note to leave for the ticket"
              value={description}
              onChange={this.changeDescriptionEvent}>
            </textarea>
          </div>

          <div class="form-group">
            <label htmlfor="resolution"><i class="fas fa-tools"></i> Resolution</label>
            <textarea
              class="form-control"
              id="resolution"
              rows="3"
              placeholder="Enter the resultion if you resloved the ticket"
              value={resolution}
              onChange={this.changeResolutionEvent}>
            </textarea>
          </div>

          <input
            className="btn btn-warning float-left"
            type="file"
            id="ticket-image"
            onChange={this.uploadImage}
          />
          <button className="btn btn-warning float-right" onClick={this.saveFollowTicket}>
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default ResponseTickets;

/* take them off

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

          <div className="form-group">
            <label htmlFor="Assign To">Assign To</label>
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

*/

/*
      const storageRef = firebase.storage().ref(`ticketsImg/${this.state.imageAsFile}`);
      storageRef.getDownloadURL().then((url) => {
        console.warn('this is the url for the image ', url);
        console.warn('access to saveFollow should now got URL if there is any');
        // let imgUrl = '';
        // let isImg = false;
        const keysIWantFollow = [
          'ticketNumber',
          'uDate',
          'replayName',
          'description',
          'imgUrlFollow',
          'isImgFollow',
          'uid',
        ];
        const newTicketFollow = _.pick(this.state, keysIWantFollow);
        newTicketFollow.uid = authData.getUid();
        newTicketFollow.ticketId = ticketId;
        if (url !== '') {
          newTicketFollow.imgUrlFollow = url;
          newTicketFollow.isImgFollow = true;
          ticketsFollowData.createTicketFollow(newTicketFollow)
            .then()
            .catch((err) => console.error(err));
        } else {
          newTicketFollow.imgUrl = '';
          newTicketFollow.isImg = false;
          ticketsFollowData.createTicketFollow(newTicketFollow)
            .then()
            .catch((err) => console.error(err));
          console.warn('failure to upload ?? url is ', this.state.imageAsUrl);
        }
        // this.setState({ imageAsUrl: url });
      });
*/

/*
      const keysIWantFollow = [
        'ticketNumber',
        'uDate',
        'replayName',
        'description',
        // 'imgUrlFollow',
        // 'isImgFollow',
        'uid',
      ];
      const newTicketFollow = _.pick(this.state, keysIWantFollow);
      newTicketFollow.uid = authData.getUid();
      newTicketFollow.ticketId = ticketId;
      newTicketFollow.imgUrlFollow = this.state.myUrl;
      newTicketFollow.isImgFollow = true;
      ticketsFollowData.createTicketFollow(newTicketFollow)
        .then()
        .catch((err) => console.error(err));
*/

/*

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  placeholder={category}
                  value={category}
                  onChange={this.changeCategoryEvent}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="assigntTo"><i class="fas fa-at"></i> Assignt To</label>
                <input
                  type="text"
                  className="form-control"
                  id="assignTo"
                  placeholder="Select to assign to"
                  value={assignTo}
                  onChange={this.changeAssignToEvent}
                  disabled
                />
              </div>
            </div>
          </div>
*/
