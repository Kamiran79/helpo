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
              <NavLink className="myNav" tag={RRNavLink} to="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="myNav" tag={RRNavLink} to="/tickets">Tickets</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="myNav" tag={RRNavLink} to="/kBase"><i class="fas fa-server"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="myNav" onClick={this.logMeOut}> <i class="fas fa-sign-out-alt"></i></NavLink>
            </NavItem>
          </Nav>
        );
      }

      return <Nav className="ml-auto" navbar></Nav>;
    };

    return (
      <div>
        <Navbar className="myNavbar" color="light" light expand="md">
          <NavbarBrand className="myNav" href="/">HELPO</NavbarBrand>
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
