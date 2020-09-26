import React from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

import DatePicker from 'react-datepicker';
import _ from 'underscore';

import authData from '../../../helpers/data/authData';
import kbHubData from '../../../helpers/data/kbHubData';
import kbNumberData from '../../../helpers/data/kbNumberData';
import usersData from '../../../helpers/data/usersData';

import 'react-datepicker/dist/react-datepicker.css';
import './KBnew.scss';

class KBnew extends React.Component {
  state = {
    kbNumber: 0,
    // cUid: '',
    createDate: new Date(),
    // cDate: '',
    updateDate: new Date(),
    author: '',
    department: '',
    category: '',
    // toAddress: '',
    // assignTo: '',
    topic: '',
    details: '',
    status: 'Wait_For_Approval',
    // priority: '',
    resolution: '',
    // dDate: new Date(),
    // imgUrl: '',
    isImgAttached: false,
    imageAsFile: '',
    imageAsUrl: '',
  }

  changeCategoryEvent = (e) => {
    e.preventDefault();
    this.setState({ category: e.target.value });
  };

  changeTopicEvent = (e) => {
    e.preventDefault();
    this.setState({ topic: e.target.value });
  };

  createDateEvent = (createDate) => {
    this.setState({ createDate });
  };

  changeDepartmentEvent = (e) => {
    e.preventDefault();
    this.setState({ department: e.target.value });
  };

  changeDetailsEvent = (e) => {
    e.preventDefault();
    this.setState({ details: e.target.value });
  };

  AddNewKBSteps = (e) => {
    e.preventDefault();
    // const imgUrl, isImg } = this.state;
    // let isImg = false;
    if (this.state.imageAsFile !== '') {
      const storageRef = firebase.storage().ref(`kbsImg/${this.state.imageAsFile}`);
      storageRef.getDownloadURL().then((url) => {
        console.warn('this is the url for the image ', url);
        // let imgUrl = '';
        // let isImg = false;
        const keysIWant = [
          'kbNumber',
          // 'cUid',
          'createDate',
          // 'cDate',
          'updateDate',
          'author',
          'department',
          'category',
          // 'toAddress',
          // 'assignTo',
          'topic',
          'details',
          'status',
          // 'priority',
          // 'dDate',
          'resolution',
        ];
        const newKB = _.pick(this.state, keysIWant);
        newKB.uid = authData.getUid();
        // newKB.isClose = false;
        if (url !== '') {
          // this.setImge(url);
          // this.myImges = url;
          newKB.imgUrl = url;
          newKB.isImg = true;
          kbHubData.createKB(newKB)
            .then((res) => {
              this.props.history.push(`/kbSteps/${res.data.name}`);
            })
            .catch((err) => console.error('new KB broke', err));
        }
        // this.setState({ imageAsUrl: url });
      });
    } else {
      const keysIWant = [
        'kbNumber',
        // 'cUid',
        'createDate',
        // 'cDate',
        'updateDate',
        'author',
        'department',
        'category',
        // 'toAddress',
        // 'assignTo',
        'topic',
        'details',
        'status',
        // 'priority',
        // 'dDate',
        'resolution',
      ];
      const newKB = _.pick(this.state, keysIWant);
      newKB.uid = authData.getUid();
      // newKB.isClose = false;
      newKB.imgUrl = '';
      newKB.isImg = false;
      kbHubData.createKB(newKB)
        .then((res) => {
          this.props.history.push(`/kbSteps/${res.data.name}`);
        })
        .catch((err) => console.error('new KB broke', err));
    }

    const kbNumberUpdate = {
      kbNumber: 0,
    };
    kbNumberUpdate.kbNumber = this.state.kbNumber + 1;
    // console.warn('see the update object kb numb ', kbNumberUpdate.kbNumber);
    kbNumberData.updateKBNumber('kbNumber1', kbNumberUpdate)
      .then()
      .catch((err) => console.error('error to update number ', err));
  };

  saveNewKB = (e) => {
    e.preventDefault();
    // const imgUrl, isImg } = this.state;
    // let isImg = false;
    if (this.state.imageAsFile !== '') {
      const storageRef = firebase.storage().ref(`kbsImg/${this.state.imageAsFile}`);
      storageRef.getDownloadURL().then((url) => {
        console.warn('this is the url for the image ', url);
        // let imgUrl = '';
        // let isImg = false;
        const keysIWant = [
          'kbNumber',
          // 'cUid',
          'createDate',
          // 'cDate',
          'updateDate',
          'author',
          'department',
          'category',
          // 'toAddress',
          // 'assignTo',
          'topic',
          'details',
          'status',
          // 'priority',
          // 'dDate',
          'resolution',
        ];
        const newKB = _.pick(this.state, keysIWant);
        newKB.uid = authData.getUid();
        // newKB.isClose = false;
        if (url !== '') {
          // this.setImge(url);
          // this.myImges = url;
          newKB.imgUrl = url;
          newKB.isImg = true;
          kbHubData.createKB(newKB)
            .then((res) => {
              this.props.history.push(`/singleKB/${res.data.name}`);
            })
            .catch((err) => console.error('new KB broke', err));
        }
        // this.setState({ imageAsUrl: url });
      });
    } else {
      const keysIWant = [
        'kbNumber',
        // 'cUid',
        'createDate',
        // 'cDate',
        'updateDate',
        'author',
        'department',
        'category',
        // 'toAddress',
        // 'assignTo',
        'topic',
        'details',
        'status',
        // 'priority',
        // 'dDate',
        'resolution',
      ];
      const newKB = _.pick(this.state, keysIWant);
      newKB.uid = authData.getUid();
      // newKB.isClose = false;
      newKB.imgUrl = '';
      newKB.isImg = false;
      kbHubData.createKB(newKB)
        .then((res) => {
          this.props.history.push(`/singleKB/${res.data.name}`);
        })
        .catch((err) => console.error('new KB broke', err));
    }

    const kbNumberUpdate = {
      kbNumber: 0,
    };
    kbNumberUpdate.kbNumber = this.state.kbNumber + 1;
    // console.warn('see the update object kb numb ', kbNumberUpdate.kbNumber);
    kbNumberData.updateKBNumber('kbNumber1', kbNumberUpdate)
      .then()
      .catch((err) => console.error('error to update number ', err));
  };

  componentDidMount() {
    const { uid } = this.props.match.params;
    // const obj = authData.getUser();
    // this.setImge();
    const imgUrl = '';
    this.setState({ imgUrl });
    kbNumberData.getSingleKBNumberById('kbNumber1')
      .then(({ data }) => {
        let { kbNumber } = this.state;
        kbNumber = data.kbNumber;
        // console.warn('data is', data);
        console.warn('nu is', kbNumber);
        this.setState({ kbNumber });
      })
      .catch((err) => console.error(err));
    // this.setState({ ticketNumber: 0 });
    usersData.getUserByUid(uid)
      .then((res) => {
        // console.warn('uid ', uid);
        // console.warn('user name ', res[0].name);
        this.setState({
          // cUid: res[0].uid,
          author: res[0].name,
          department: res[0].department,
        });
      })
      .catch((err) => console.error('read user error ', err));
  }

  uploadImage = () => {
    const file = document.getElementById('kb-image').files[0];
    const image = file.name;
    // const { imageAsFile } = this.state;
    this.setState({ imageAsFile: image });
    console.warn('image file name ', image);
    firebase.storage().ref(`kbsImg/${image}`).put(file).then(() => {});
  };

  render() {
    const {
      // ticketNumber,
      // cUid,
      createDate,
      // cDate,
      author,
      // department,
      forDepartment,
      // category,
      forCategory,
      // toAddress,
      // forToAddress,
      // assignTo,
      // forAssignTo,
      // subject,
      topic,
      details,
      // resolution,
      status,
      // priority,
      // forPriority,
      // dDate,
      // imageAsFile,
    } = this.state;
    return (
      <div className="KBnew col-12">
        <h2 className="float-left singleTicket_title">New KB</h2>
        <h2 className="float-right singleTicket_title">HOW TO .. <i class="fas fa-question"></i></h2>
        <br />
        <hr />
        <form className="col-8 offset-2 shadow p-3 newKBform mb-3 rounded">
          <div class="form-row mt-5">
            <div class="form-group col-md-6">
              <label htmlFor="createDate"><i class="fas fa-calendar-alt"></i> Create Date: {' '} </label>
              <DatePicker
                class="form-control"
                selected={createDate}
                onChange={this.createDateEvent}
                showTimeSelect
              />
            </div>
            <div class="form-group col-md-6">
              <label htmlFor="updateDate"><i class="fas fa-calendar-alt"></i> Update Date: {' '} </label>
              <DatePicker
                class="form-control"
                onChange={this.updateDateEvent}
                showTimeSelect
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="author"><i class="fas fa-user-circle"></i> Author: </label>
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
              <div class="form-group">
                <label htmlFor="Department"><i class="far fa-building"></i> Department</label>
                <select
                  value={forDepartment}
                  onChange={this.changeDepartmentEvent}
                  class="form-control"
                  id="department">
                  <option>Please Select a Department</option>
                  <option value='E11'>E11</option>
                  <option value='E12'>E12</option>
                  <option value='Developer'>Developer</option>
                  <option value='E13'>E13</option>
                  <option value='IT'>IT</option>
                  <option value='Others'>Others</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Category"><i class="fas fa-puzzle-piece"></i> Category</label>
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
            </div>
            <div className="col-md-6">
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
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="Topic"><i class="fab fa-ethereum"></i> Topic</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="Enter the Topic - HOW TO .. ?"
              value={topic}
              onChange={this.changeTopicEvent}
              required
            />
          </div>

          <div class="form-group">
            <label htmlfor="details"><i class="fas fa-exclamation-triangle"></i> Topic Main details</label>
            <textarea
              class="form-control"
              id="details"
              rows="3"
              placeholder="explain the topic details"
              value={details}
              onChange={this.changeDetailsEvent}>
            </textarea>
          </div>
          <div className="form-group col-md-12">
            <input
              className="btn btn-info "
              type="file"
              id="kb-image"
              onChange={this.uploadImage}
            />
          </div>
          <button className="btn btn-info float-left" onClick={this.AddNewKBSteps}>
            Add Next Step
          </button>
          <button className="btn btn-info float-right" onClick={this.saveNewKB}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default KBnew;
