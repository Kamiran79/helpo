import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './Auth.scss';

class Auth extends React.Component {
  state = {
    ticketNumber: 0,
    cUid: '',
    oDate: new Date(),
    cDate: '',
    uDate: new Date(),
    name: '',
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

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">

        <h1 className="target_h2_Land line anim-typewriter">iHelpo an smart track ticket .. help the orgnization to follow up with issue .. fit with any orgnization ...</h1>
      </div>
    );
  }
}

export default Auth;

/*
Auth form here
    const {

      name,
      // department,
      forDepartment,
      email,
      // category,
      // forCategory,
      // toAddress,
      // forToAddress,
      // assignTo,
      // forAssignTo,
      // subject,
      // details,
      // resolution,
      // status,
      // priority,
      // forPriority,
      // dDate,
      // imageAsFile,
    } = this.state;
<button className="btn btn-info" onClick={this.loginClickEvent}>Google Login</button>
        <div className="NewTicket col-12">
          <h2 className="float-left">Sign In</h2>
          <h2 className="float-right">Register</h2>
          <br />
          <hr />
          <form className="col-8 offset-2 shadow p-3 bg-primary mb-3 rounded">
            <div class="form-row mt-5">
              <div class="form-group col-md-6">
                <label htmlFor="name"><i class="fas fa-portrait"></i> Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Your Full Name"
                  value={name}
                  onChange={this.changeNameEvent}
                />
              </div>
              <div class="form-group col-md-6">
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
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" value={email} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
          </form>
        </div>
*/
