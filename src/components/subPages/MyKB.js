import React from 'react';
import {
  ButtonDropdown,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button,
} from 'reactstrap';

import OneKB from '../shared/kbShared/OneKB';
// import ticketsData from '../../helpers/data/ticketsData';
import authData from '../../helpers/data/authData';
import kbHubData from '../../helpers/data/kbHubData';

import './MyKB.scss';

class MyKB extends React.Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
    dropdownOpen1: false,
    myKBs: [],
  }

  toggle = () => {
    const { isOpen } = this.state;
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen });
    this.setState({ isOpen: !isOpen });
  };

  toggle1 = () => {
    const { isOpen } = this.state;
    const { dropdownOpen1 } = this.state;
    this.setState({ dropdownOpen1: !dropdownOpen1 });
    this.setState({ isOpen: !isOpen });
  };

  newKBEvent = (e) => {
    e.preventDefault();
    // try git info before pass to that page.
    // this.props.history.push(`/newTicket/${'UID or somthing to pass'}`);
    // const birbId = 'birb10000';
    const obj = authData.getUser();
    this.props.history.push(`/newKB/${obj.uid}`);
    // return <Link to='/newTicket'></Link>;
    // this.props.history.push(`/new/${birbId}`);
  }

  getAllKBs = () => {
    kbHubData.getkbsByUid(authData.getUid())
      .then((myKBs) => {
        this.setState({ myKBs });
      })
      .catch((err) => console.error('get myKBs broke!!', err));
  };

  componentDidMount() {
    this.getAllKBs();
  }

  sortByNewA = () => {
    const { myKBs } = this.state;
    // eslint-disable-next-line no-confusing-arrow
    myKBs.sort((a, b) => (a.status > b.status) ? 1 : -1);
    this.setState({ myKBs });
    // console.warn('see what have tickets array objext ', tickets);
  };

  filterByNew = () => {
    let { myKBs } = this.state;
    kbHubData.getkbsByUid(authData.getUid())
      .then((backKBs) => {
        myKBs = backKBs.filter((myKB) => myKB.status === 'New');
        this.setState({ myKBs });
      })
      .catch((err) => console.error('get myKBs broke!!', err));
  };

  deleteMyKB = (myKBId) => {
    kbHubData.deleteMyKB(myKBId)
      .then(() => this.getAllKBs())
      .catch((err) => console.error(err));
  }

  render() {
    const { myKBs } = this.state;
    const myKBsCard = myKBs.map((myKB) => <OneKB key={myKB.id} myKB={myKB} deleteMyKB={this.deleteMyKB}/>);
    return (
      <div className="MyKB">
        <h2 className="shadow p-3 mb-3 rounded singleTicket_title"> My Knolowdge Base </h2>
        <ButtonGroup className="mb-2 shadow p-3 mb-3 rounded" >
          <Button className="btn btn-dark" onClick={this.newKBEvent}><i class="far fa-plus-square"></i> New KB</Button>
          {/* <Link className="btn btn-primary" to='/newTicket'>New Ticket</Link> */}
          {/* <Button>Filter</Button> */}
          <ButtonDropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
            <DropdownToggle caret>
            <i class="fas fa-filter"></i> Filter
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.getAllKBs}>All</DropdownItem>
              <DropdownItem onClick={this.filterByNew}>New</DropdownItem>
              <DropdownItem onClick={this.filterByOpen}>Open</DropdownItem>
              <DropdownItem onClick={this.filterByResolved}>Resolved</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            <i class="fas fa-sort-amount-down"></i> Sort By
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.sortByNewA}>Sort By New <i class="fas fa-sort-amount-down-alt"></i></DropdownItem>
              <DropdownItem onClick={this.sortByNewZ}>Sort By New <i class="fas fa-sort-amount-up"></i></DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
      </div>
    );
  }
}

export default MyKB;
