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

const getSingleKBNumberById = (kbNumberId) => axios.get(`${baseUrl}/kbNumber/${kbNumberId}.json`);

const getTicketNumber = () => axios.get(`${baseUrl}/ticketNumber.json`);

const deleteTicket = (ticketId) => axios.delete(`${baseUrl}/tickets/${ticketId}.json`);

const createTicketNumber = (newTicketNumber) => axios.post(`${baseUrl}/ticketNumber.json`, newTicketNumber);

const updateKBNumber = (kbNumberId, editedKBNumber) => axios.put(`${baseUrl}/kbNumber/${kbNumberId}.json`, editedKBNumber);

export default {
  getTicketsByUid,
  getSingleKBNumberById,
  getTicketNumber,
  deleteTicket,
  createTicketNumber,
  updateKBNumber,
};
