import React from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import DatePicker from 'react-datepicker';
import _ from 'underscore';

import authData from '../../../helpers/data/authData';
// import kbHubData from '../../../helpers/data/kbHubData';
// import kbNumberData from '../../../helpers/data/kbNumberData';
import usersData from '../../../helpers/data/usersData';
import kbContentData from '../../../helpers/data/kbContentData';

import 'react-datepicker/dist/react-datepicker.css';
import './KBSteps.scss';

class KBSteps extends React.Component {
  state = {
    // kbNumber: 0,
    // cUid: '',
    stepDate: new Date(),
    // topic: '',
    details: '',
    // status: 'Wait_For_Approval',
    // imgUrl: '',
    isImgAttached: false,
    imageAsFile: '',
    imageAsUrl: '',
    linkRef: '',
    myTest: '',
    replayName: '',
  }

  changeLinkRefEvent = (e) => {
    e.preventDefault();
    this.setState({ linkRef: e.target.value });
  };

  changeDetailsEvent = (e) => {
    e.preventDefault();
    this.setState({ details: e.target.value });
  };

  addNewKBSteps = (e) => {
    e.preventDefault();
    // const imgUrl, isImg } = this.state;
    // let isImg = false;
    const { kbId } = this.props.match.params;
    if (this.state.imageAsFile !== '') {
      const storageRef = firebase.storage().ref(`kbsImg/${this.state.imageAsFile}`);
      storageRef.getDownloadURL().then((url) => {
        console.warn('this is the url for the image ', url);
        const keysIWant = [
          'stepDate',
          // 'topic',
          'details',
          'linkRef',
        ];
        const newKB = _.pick(this.state, keysIWant);
        newKB.uid = authData.getUid();
        // newKB.isClose = false;
        if (url !== '') {
          // this.setImge(url);
          // this.myImges = url;
          newKB.imgUrl = url;
          newKB.isImg = true;
          newKB.kbId = kbId;
          kbContentData.createKBContent(newKB)
            .then((res) => {
              this.props.history.push(`/kbSteps/${kbId}`);
              // this.props.history.push(`/singleKB/${kbId}`);
            })
            .catch((err) => console.error('new KB broke', err));
        }
        // this.setState({ imageAsUrl: url });
      });
    } else {
      const keysIWant = [
        'stepDate',
        // 'topic',
        'details',
        'linkRef',
      ];
      const newKB = _.pick(this.state, keysIWant);
      newKB.uid = authData.getUid();
      // newKB.isClose = false;
      newKB.imgUrl = '';
      newKB.isImg = false;
      newKB.kbId = kbId;
      kbContentData.createKBContent(newKB)
        .then((res) => {
          this.props.history.push(`/kbSteps/${kbId}`);
        })
        .catch((err) => console.error('new KB broke', err));
    }
  };

  saveNewKBSteps = (e) => {
    e.preventDefault();
    // const imgUrl, isImg } = this.state;
    // let isImg = false;
    const { kbId } = this.props.match.params;
    if (this.state.imageAsFile !== '') {
      const storageRef = firebase.storage().ref(`kbsImg/${this.state.imageAsFile}`);
      storageRef.getDownloadURL().then((url) => {
        console.warn('this is the url for the image ', url);
        const keysIWant = [
          'stepDate',
          // 'topic',
          'details',
          'linkRef',
        ];
        const newKB = _.pick(this.state, keysIWant);
        newKB.uid = authData.getUid();
        // newKB.isClose = false;
        if (url !== '') {
          // this.setImge(url);
          // this.myImges = url;
          newKB.imgUrl = url;
          newKB.isImg = true;
          newKB.kbId = kbId;
          kbContentData.createKBContent(newKB)
            .then((res) => {
              // this.props.history.push(`/kbSteps/${kbId}`);
              this.props.history.push(`/singleKB/${kbId}`);
            })
            .catch((err) => console.error('new KB broke', err));
        }
        // this.setState({ imageAsUrl: url });
      });
    } else {
      const keysIWant = [
        'stepDate',
        // 'topic',
        'details',
        'linkRef',
      ];
      const newKB = _.pick(this.state, keysIWant);
      newKB.uid = authData.getUid();
      // newKB.isClose = false;
      newKB.imgUrl = '';
      newKB.isImg = false;
      newKB.kbId = kbId;
      kbContentData.createKBContent(newKB)
        .then((res) => {
          // this.props.history.push(`/kbSteps/${kbId}`);
          this.props.history.push(`/singleKB/${kbId}`);
        })
        .catch((err) => console.error('new KB broke', err));
    }
  };

  componentDidMount() {
    const { kbId } = this.props.match.params;
    const myTest = kbId;
    this.setState({ myTest });
    this.setState({
      stepDate: new Date(),
      details: '',
      linkRef: '',
    });
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
      stepDate,
      // author,
      linkRef,
      details,
    } = this.state;
    return (
      <div className="KBSteps">
        <h2 className="float-left singleTicket_title">New KB</h2>
        <h2 className="float-right singleTicket_title">HOW TO .. <i class="fas fa-question"></i></h2>
        <br />
        <hr />
        <form className="col-8 offset-2 shadow p-3 newKBform mb-3 rounded">
          <div class="form-row mt-5">
            <div class="form-group col-md-12">
              <label htmlFor="createDate"><i class="fas fa-calendar-alt"></i> Step Date: {' '} </label>
              <DatePicker
                class="form-control"
                selected={stepDate}
                onChange={this.stepDateEvent}
                showTimeSelect
                disabled
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="Topic"><i class="fab fa-ethereum"></i> Add Reference Link</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="https://www.yourReference.com"
              value={linkRef}
              onChange={this.changeLinkRefEvent}
            />
          </div>

          <div class="form-group">
            <label htmlfor="details"><i class="fas fa-exclamation-triangle"></i> Step details</label>
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
              className="btn btn-warning "
              type="file"
              id="kb-image"
              onChange={this.uploadImage}
            />
          </div>
          <button className="btn btn-warning float-left" onClick={this.addNewKBSteps}>
            Add Next Step
          </button>
          <button className="btn btn-warning float-right" onClick={this.saveNewKB}>
            Submit
          </button>
        </form>
        <h2>INSIDE KBSteps COMPONENT</h2>
        <button className="btn btn-info">I am a button</button>
      </div>
    );
  }
}

export default KBSteps;
