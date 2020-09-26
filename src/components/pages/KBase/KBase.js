import React from 'react';
import Nav from 'react-bootstrap/Nav';

import KBDash from '../../subPages/KBDash';
import MyKB from '../../subPages/MyKB';

import kbHubData from '../../../helpers/data/kbHubData';
import usersData from '../../../helpers/data/usersData';
import authData from '../../../helpers/data/authData';
import './KBase.scss';

class KBase extends React.Component {
  state = {
    dash: 'link-1',
    tickeLink: 'link3',
    name: '',
    department: '',
    allKBs: [],
  }

  updateTickets = (select) => {
    this.setState({ tickeLink: select });
  };

  eventClick = (e) => {
    e.preventDefault();
    const selected = e.target.id;
    this.updateTickets(selected);
  };

  componentDidMount() {
    this.setState({ dash: 'link1', tickets: [] });
    kbHubData.getAllKB()
      .then((backKBs) => {
        // let tickets1 = [];
        const allKBs = backKBs;
        // tickets1 = backtickets.filter((ticket) => ticket.status === 'Open');
        // const openCount = tickets1.length;
        // tickets1 = backtickets.filter((ticket) => ticket.status === 'New');
        // const newCount = tickets1.length;
        // tickets1 = backtickets.filter((ticket) => ticket.status === 'Resolved');
        // const resolvedCount = tickets1.length;
        // const { tickets } = backtickets;
        this.setState({
          allKBs,
        });
      })
      .catch((err) => console.error('get tickets broke!!', err));
    const userObj = authData.getUser();
    // console.warn('getting user info ', userObj.uid);
    // const uid = authData.getUid;
    usersData.getUserByUid(userObj.uid)
      .then((res) => {
        this.setState({ name: res[0].name, department: res[0].department });
        // console.warn('getting user info ', res[0].department);
      })
      .catch((err) => console.warn('get user error ', err));
  }

  render() {
    const buildTicket = () => {
      const { tickeLink } = this.state;
      if (tickeLink === 'link1') {
        /* ticketsData.getTicketsByUid(authData.getUid())
          .then((tickets) => {
            console.warn('this return to pas prop ', tickets);
            this.setState({ tickets });
            // const ticketDash = res.map((ticket) => <TicketsDash key={ticket.id} birb={ticket}/>);
          })
          .catch((err) => console.error(err)); */
        return (
          <KBDash />
          // new={this.state.newCount}
          // open={this.state.openCount}
          // resolved={this.state.resolvedCount}
          // tickets={this.state.tickets}
          // />
          // ticketDash;
        );
      }
      // <AssignedTickets new={this.state.newCount} tickets={this.state.tickets} department={this.state.department}/>
      if (tickeLink === 'link2') {
        return (
          <div></div>
        );
      }

      if (tickeLink === 'link3') {
        return (
          <MyKB {...this.props}/>
          // <MyRealTickets name={this.name} department={this.department}/>
        );
      }

      return <h2> nothing selected </h2>;
    };

    return (
      <div className="KBase">
        <Nav justify variant="tabs" defaultActiveKey="/link3">
          <Nav.Item>
            <Nav.Link disabled><i class="far fa-bookmark"></i>  How To .. <i class="fas fa-question"></i></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/link1" id="link1" onClick={this.eventClick}><i class="fas fa-inbox"></i> KB Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3" id="link3" onClick={this.eventClick}><i class="far fa-folder-open"></i> My KB</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" id="link2" onClick={this.eventClick}></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-4"></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>

            </Nav.Link>
          </Nav.Item>
        </Nav>
        {buildTicket()}
      </div>
    );
  }
}

export default KBase;

/*
import React from 'react';
import Nav from 'react-bootstrap/Nav';
// import Card from 'react-bootstrap/Card';
import KBDash from '../../subPages/KBDash';
import MyKB from '../../subPages/MyKB';
import AssignedKBase from '../../shared/AssignedTickets';
// import MyRealKBase from '../../shared/MyRealKBase';

import authData from '../../../helpers/data/authData';
import usersData from '../../../helpers/data/usersData';
// import KBaseData from '../../../helpers/data/KBaseData';
// import KBaseData from '../../../helpers/data/kbHubData';

import './KBase.scss';

class KBase extends React.Component {
  state = {
    dash: 'link-1',
    tickeLink: 'link3',
    name: '',
    department: '',
    kBaseItems: [],
    openCount: 0,
    newCount: 0,
    resolvedCount: 0,
  }

  updateKBase = (select) => {
    this.setState({ tickeLink: select });
  };

  eventClick = (e) => {
    e.preventDefault();
    const selected = e.target.id;
    this.updateKBase(selected);
  };

  componentDidMount() {
    this.setState({ dash: 'link1', kBaseItems: [] });
    KBaseData.getKBaseByUid(authData.getUid())
      .then((backKBase) => {
        let kBaseItems1 = [];
        const kBaseItems = backKBase;
        kBaseItems1 = backKBase.filter((kBaseItem) => kBaseItem.status === 'Open');
        const openCount = kBaseItems1.length;
        kBaseItems1 = backKBase.filter((kBaseItem) => kBaseItem.status === 'New');
        const newCount = kBaseItems1.length;
        kBaseItems1 = backKBase.filter((kBaseItem) => kBaseItem.status === 'Resolved');
        const resolvedCount = kBaseItems1.length;
        // const { KBase } = backKBase;
        this.setState({
          openCount,
          newCount,
          resolvedCount,
          kBaseItems,
        });
      })
      .catch((err) => console.error('get KBase broke!!', err));
   const userObj = authData.getUser();
   // console.warn('getting user info ', userObj.uid);
   // const uid = authData.getUid;
   usersData.getUserByUid(userObj.uid)
     .then((res) => {
       this.setState({ name: res[0].name, department: res[0].department });
       // console.warn('getting user info ', res[0].department);
     })
     .catch((err) => console.warn('get user error ', err));
 }

 render() {
   const buildTicket = () => {
     const { tickeLink } = this.state;
     if (tickeLink === 'link1') {
       KBaseData.getKBaseByUid(authData.getUid())
         .then((KBase) => {
           console.warn('this return to pas prop ', KBase);
           this.setState({ KBase });
           // const ticketDash = res.map((ticket) => <KBaseDash key={ticket.id} birb={ticket}/>);
         })
         .catch((err) => console.error(err));
       return (
         <KBDash
           new={this.state.newCount}
           open={this.state.openCount}
           resolved={this.state.resolvedCount}
           KBase={this.state.kBaseItems}
         />
         // ticketDash;
       );
     }

     if (tickeLink === 'link2') {
       return (
         <AssignedKBase new={this.state.newCount} KBase={this.state.KBase} department={this.state.department}/>
       );
     }

     if (tickeLink === 'link3') {
       return (
         <MyKB {...this.props}/>
         // <MyRealKBase name={this.name} department={this.department}/>
       );
     }

     return <h2> nothing selected </h2>;
   };

   return (
     <div className="KBase">
       <Nav justify variant="tabs" defaultActiveKey="/link3">
         <Nav.Item>
           <Nav.Link disabled></Nav.Link>
         </Nav.Item>
         <Nav.Item>
           <Nav.Link href="/link1" id="link1" onClick={this.eventClick}><i class="fas fa-chart-pie"></i> Dashboard</Nav.Link>
         </Nav.Item>
         <Nav.Item>
           <Nav.Link eventKey="link-3" id="link3" onClick={this.eventClick}><i class="far fa-folder-open"></i> My Requests</Nav.Link>
         </Nav.Item>
         <Nav.Item>
           <Nav.Link eventKey="link-2" id="link2" onClick={this.eventClick}><i class="far fa-folder-open"></i> Assigned KBase</Nav.Link>
         </Nav.Item>
         <Nav.Item>
           <Nav.Link eventKey="link-4">Group KBase</Nav.Link>
         </Nav.Item>
         <Nav.Item>
           <Nav.Link eventKey="disabled" disabled>
           Disabled
           </Nav.Link>
         </Nav.Item>
       </Nav>
       {buildTicket()}
     </div>
   );
 }
}

export default KBase;
*/
