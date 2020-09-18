import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getticketsByUid = (uid) => new Promise((resolve, reject) => {
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

const getSingleTicketById = (ticketId) => axios.get(`${baseUrl}/tickets/${ticketId}.json`);

const deleteTicket = (ticketId) => axios.delete(`${baseUrl}/tickets/${ticketId}.json`);

const createTicket = (newticket) => axios.post(`${baseUrl}/tickets.json`, newticket);

const updateTicket = (ticketId, editedTicket) => axios.put(`${baseUrl}/tickets/${ticketId}.json`, editedTicket);

export default {
  getticketsByUid,
  getSingleTicketById,
  deleteTicket,
  createTicket,
  updateTicket,
};
