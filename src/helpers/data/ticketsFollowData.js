import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getTicketsFollowByTicketId = (ticketId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ticketsFollow.json?orderBy="ticketId"&equalTo="${ticketId}"`)
    .then((response) => {
      const ticketFollowObjects = response.data;
      // console.warn('ticketId passed ', ticketId);
      // console.warn('access to get follow ', response.data);
      const mytickets = [];
      if (ticketFollowObjects) {
        Object.keys(ticketFollowObjects).forEach((ticketFollowId) => {
          // const ticket = alltickets[ticketFollowId];
          // ticket.id = ticketFollowId;
          // mytickets.push(ticket);
          ticketFollowObjects[ticketFollowId].id = ticketFollowId;
          mytickets.push(ticketFollowObjects[ticketFollowId]);
        });
      }
      resolve(mytickets);
    })
    .catch((err) => reject(err));
});

const getFollows = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ticketsFollow.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
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
  getFollows,
};
