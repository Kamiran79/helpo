/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';

import authData from '../../../helpers/data/authData';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    level: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
  }

  state = {
    isOpen: false,
    userPhoto: '',
  }

  getUserObject = () => {
    const userObj = authData.getUser();
    console.warn('try get user object ', userObj);
  };

  componentDidMount() {
    this.getUserObject();
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;

    const buildNavbar = () => {
      const { authed, level, userPhoto } = this.props;

      if (authed && level === 'admin') {
        return (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to="/home">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/admin">Admin</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.logMeOut}><img src={userPhoto} className="thumbnail" alt="" /> <i class="fas fa-sign-out-alt"></i></NavLink>
              </NavItem>
            </Nav>
        );
      }

      if (authed && level === 'user') {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="myNav" tag={RRNavLink} to="/home"><i class="fas fa-home"></i> Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="myNav" tag={RRNavLink} to="/tickets/:link1"><i class="fas fa-ticket-alt"></i> Tickets</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="myNav" tag={RRNavLink} to="/kBase"><i class="fas fa-server"></i> Knowledge Base</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="myNav log_class" onClick={this.logMeOut}> <i class="fas fa-sign-out-alt"></i> Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      // <NavLink className="myNav" onClick={this.logMeOut} tag={RRNavLink}to="/auth"><i class="fas fa-user-circle"></i> <button className="btn btn-info" onClick={this.loginClickEvent}><i class="fab fa-google"></i> Login</button></NavLink>
      if (!authed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="myNav" tag={RRNavLink} to="/auth"><i class="fas fa-home"></i> Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="myNav" tag={RRNavLink} to="/tickets/:link1"></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="myNav log_class" onClick={this.loginClickEvent} > <i class="fas fa-user-circle"></i> Login </NavLink>
            </NavItem>
          </Nav>
        );
      }

      return <Nav className="ml-auto" navbar></Nav>;
    };

    return (
      <div>
        <Navbar className="myNavbar" color="light" light expand="md">
          <NavbarBrand className="myNav myLogoNav" href="/">iHELPO</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
