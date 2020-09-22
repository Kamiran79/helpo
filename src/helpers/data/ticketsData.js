import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getTicketsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/tickets.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const alltickets = response.data;
      const mytickets = [];
      if (alltickets) {
        Object.keys(alltickets).forEach((ticketId) => {
          const ticket = alltickets[ticketId];
          ticket.id = ticketId;
          mytickets.push(ticket);
        });
      }
      resolve(mytickets);
    })
    .catch((err) => reject(err));
});

const getAllTicketByAssignDepartment = (department) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/tickets.json`)
    .then((response) => {
      const ticketFollowObjects = response.data;
      const mytickets = [];
      if (ticketFollowObjects) {
        // let myAssignedTicket = [];
        // console.warn(alltickets);
        // myAssignedTicket = alltickets.filter((ticketAssigned) => (ticketAssigned.assignTo === `${department}`) || (ticketAssigned.assignTo === 'MySelf'));
        Object.keys(ticketFollowObjects).forEach((ticketId) => {
          // const ticket = alltickets[ticketId];
          ticketFollowObjects[ticketId].id = ticketId;
          if (ticketFollowObjects[ticketId].assignTo === `${department}` || ticketFollowObjects[ticketId].assignTo === 'Myself') {
            mytickets.push(ticketFollowObjects[ticketId]);
          }
        });
      }
      resolve(mytickets);
    })
    .catch((err) => reject(err));
});

const getSingleTicketById = (ticketId) => axios.get(`${baseUrl}/tickets/${ticketId}.json`);

const deleteTicket = (ticketId) => axios.delete(`${baseUrl}/tickets/${ticketId}.json`);

const createTicket = (newticket) => axios.post(`${baseUrl}/tickets.json`, newticket);

const updateTicket = (ticketId, editedTicket) => axios.put(`${baseUrl}/tickets/${ticketId}.json`, editedTicket);

export default {
  getTicketsByUid,
  getAllTicketByAssignDepartment,
  getSingleTicketById,
  deleteTicket,
  createTicket,
  updateTicket,
};
