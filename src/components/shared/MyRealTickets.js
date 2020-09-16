import React from 'react';
import {
  ButtonDropdown,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button,
} from 'reactstrap';
// import './MyRealTickets.scss';

class MyRealTickets extends React.Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
  }

  toggle = () => {
    const { isOpen } = this.state;
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen });
    this.setState({ isOpen: !isOpen });
  };

  render() {
    // const { isOpen } = this.state;
    return (
      <div className="MyRealTickets">
        <h2>INSIDE MyRealTickets COMPONENT</h2>
        {/* <button className="btn btn-info">I am a button</button> */}
        <ButtonGroup>
          <Button>New Ticket</Button>
          <Button>Filter</Button>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Sort By
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Sort By New</DropdownItem>
              <DropdownItem>Sort By Open</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
      </div>
    );
  }
}

export default MyRealTickets;

/* didn't work

        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
          <button type="button" className="btn btn-secondary">1</button>
          <button type="button" className="btn btn-secondary">2</button>

          <div className="btn-group" role="group">
            <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <button className="dropdown-item" href="#">Dropdown link</button>
              <button className="dropdown-item" href="#">Dropdown link</button>
            </div>
          </div>
        </div>

*/
