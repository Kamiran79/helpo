import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getKBContentByKBId = (kbId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/kbContent.json?orderBy="kbId"&equalTo="${kbId}"`)
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
      // if you want reverse sort.
      // mytickets.sort((a, b) => ((a.uDate > b.uDate) ? 1 : -1)).reverse();
      mytickets.sort((a, b) => ((a.stepDate > b.stepDate) ? 1 : -1));
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

const createKBContent = (newKBContent) => axios.post(`${baseUrl}/kbContent.json`, newKBContent);

const updateTicket = (ticketId, editedTicket) => axios.put(`${baseUrl}/tickets/${ticketId}.json`, editedTicket);

export default {
  getKBContentByKBId,
  getSingleTicketFollowById,
  deleteTicket,
  createKBContent,
  updateTicket,
  getFollows,
};
