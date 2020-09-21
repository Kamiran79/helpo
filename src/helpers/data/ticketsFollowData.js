import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getTicketsFollowByTicketId = (ticketId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ticketsFollow.json?orderBy="ticketId"&equalTo="${ticketId}"`)
    .then((response) => {
      const alltickets = response.data;
      console.warn('ticketId passed ', ticketId);
      console.warn('access to get follow ', response.data);
      const mytickets = [];
      if (alltickets) {
        Object.keys(alltickets).forEach((ticketFollowId) => {
          const ticket = alltickets[ticketFollowId];
          ticket.id = ticketFollowId;
          mytickets.push(ticket);
        });
      }
      resolve(mytickets);
    })
    .catch((err) => reject(err));
});

const getSingleTicketFollowById = (ticketId) => axios.get(`${baseUrl}/tickets/${ticketId}.json`);

const deleteTicket = (ticketId) => axios.delete(`${baseUrl}/tickets/${ticketId}.json`);

const createTicketFollow = (newTicketFollow) => axios.post(`${baseUrl}/ticketsFollow.json`, newTicketFollow);

const updateTicket = (ticketId, editedTicket) => axios.put(`${baseUrl}/tickets/${ticketId}.json`, editedTicket);

export default {
  getTicketsFollowByTicketId,
  getSingleTicketFollowById,
  deleteTicket,
  createTicketFollow,
  updateTicket,
};
