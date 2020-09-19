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

const getSingleTicketNumberById = (ticketNumberId) => axios.get(`${baseUrl}/ticketNumber/${ticketNumberId}.json`);

const getTicketNumber = () => axios.get(`${baseUrl}/ticketNumber.json`);

const deleteTicket = (ticketId) => axios.delete(`${baseUrl}/tickets/${ticketId}.json`);

const createTicketNumber = (newTicketNumber) => axios.post(`${baseUrl}/ticketNumber.json`, newTicketNumber);

const updateTicketNumber = (ticketNumberId, editedTicketNumber) => axios.put(`${baseUrl}/ticketNumber/${ticketNumberId}.json`, editedTicketNumber);

export default {
  getTicketsByUid,
  getSingleTicketNumberById,
  getTicketNumber,
  deleteTicket,
  createTicketNumber,
  updateTicketNumber,
};
