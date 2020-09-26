import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getkbsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/kbs.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const allkbs = response.data;
      const mykbs = [];
      if (allkbs) {
        Object.keys(allkbs).forEach((kbId) => {
          const kb = allkbs[kbId];
          kb.id = kbId;
          mykbs.push(kb);
        });
      }
      resolve(mykbs);
    })
    .catch((err) => reject(err));
});

const getAllKB = (department) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/kbHub.json`)
    .then((response) => {
      const KBObjects = response.data;
      const myKBs = [];
      if (KBObjects) {
        // let myAssignedkb = [];
        // console.warn(allkbs);
        // myAssignedkb = allkbs.filter((kbAssigned) => (kbAssigned.assignTo === `${department}`) || (kbAssigned.assignTo === 'MySelf'));
        Object.keys(KBObjects).forEach((kbId) => {
          // const kb = allkbs[kbId];
          KBObjects[kbId].id = kbId;
          myKBs.push(KBObjects[kbId]);
          // if (KBObjects[kbId].assignTo === `${department}` || KBObjects[kbId].assignTo === 'Myself') {
          //  mykbs.push(KBObjects[kbId]);
          // }
        });
      }
      resolve(myKBs);
    })
    .catch((err) => reject(err));
});

const getSinglekbById = (kbId) => axios.get(`${baseUrl}/kbHub/${kbId}.json`);

const deletekb = (kbId) => axios.delete(`${baseUrl}/kbHub/${kbId}.json`);

const createKB = (newKB) => axios.post(`${baseUrl}/kbHub.json`, newKB);

const updatekb = (kbId, editedKB) => axios.put(`${baseUrl}/kbHub/${kbId}.json`, editedKB);

export default {
  getkbsByUid,
  getAllKB,
  getSinglekbById,
  deletekb,
  createKB,
  updatekb,
};
