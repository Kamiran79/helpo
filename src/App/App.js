import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import MyNavbar from '../components/pages/MyNavbar/MyNavbar';
import Tickets from '../components/pages/Tickets/Tickets';
import KBase from '../components/pages/KBase/KBase';
import NewTicket1 from '../components/pages/NewTicket/NewTicket1';
import NewTicket from '../components/shared/NewTicket';

import Admin from '../components/pages/Admin/Admin';

import usersData from '../helpers/data/usersData';
import authData from '../helpers/data/authData';
import fbConnection from '../helpers/data/connection';

import './App.scss';
import SingleTicket from '../components/pages/SingleTicket/SingleTicket';
import ResponseTickets from '../components/pages/ResponseTickets/ResponseTickets';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }}/>));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    level: '',
    userPhoto: '',
  }

  getUserObject = () => {
    const userObj = authData.getUser();
    // console.warn(userObj.photoURL);
    this.setState({ userPhoto: userObj.photoURL });
  };

  checkUserRoleRight = (uid) => {
    usersData.getUserByUid(uid)
      .then((res) => {
        // console.warn('found what return then after that the board', res[0].uid);
        if (uid === res[0].uid) {
          // console.warn('found what return then after that the board', res[0]);
          if (res[0].level === 'user') {
            this.setState({ level: 'user' });
          } else if (res[0].level === 'admin') {
            this.setState({ level: 'admin' });
          }
          // this.setState({ authed: true, flag: false });
        } else {
          this.setState({ level: '' });
        }
      })
      .catch((err) => console.error('get user error', err));
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        this.checkUserRoleRight(user.uid);
        this.getUserObject();
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, level, userPhoto } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} level={level} userPhoto={userPhoto} />
            <div className="container">
              <Switch>
                <PrivateRoute path="/home" component={Home} authed={authed} />
                <PrivateRoute path="/tickets/" component={Tickets} authed={authed} />
                <PrivateRoute path="/kBase" component={KBase} authed={authed} />
                <PrivateRoute path="/newTicket/:uid" component={NewTicket} authed={authed} />
                <PrivateRoute path="/responseTicket/:ticketId" component={ResponseTickets} authed={authed} />
                <PrivateRoute path="/new" component={NewTicket1} authed={authed} />
                <PrivateRoute path="/singleTicket/:ticketId" component={SingleTicket} authed={authed} />
                <PrivateRoute path="/admin" component={Admin} authed={authed} />
                <PublicRoute path="/auth" component={Auth} authed={authed} />
                <Redirect from="*" to="/home"/>
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

/*
import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
