import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">
        <h1>Auth</h1>
        <button className="btn btn-info" onClick={this.loginClickEvent}>Google Login</button>
      </div>
    );
  }
}

export default Auth;
