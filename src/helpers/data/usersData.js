import axios from 'axios';
import apiKey from '../apiKeys.json';

const baseUrl = apiKey.firebaseConfig.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((response) => {
      const userObjects = response.data;
      const users = [];
      Object.keys(userObjects).forEach((userId) => {
        userObjects[userId].id = userId;
        users.push(userObjects[userId]);
      });
      resolve(users);
    })
    .catch((err) => reject(err));
});

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const userObjects = response.data;
      // const user = [];
      // user.push(userObjects);
      // console.warn('this is the return user object by uid', user);
      // const userObjects = response.data;
      const users = [];
      Object.keys(userObjects).forEach((userId) => {
        userObjects[userId].id = userId;
        users.push(userObjects[userId]);
      });
      resolve(users);
    })
    .catch((err) => reject(err));
});

const getUserById = (userId) => axios.get(`${baseUrl}/users/${userId}.json`);

// const getUserByUid = (uid) => axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`);

// const getUserByUid = (uid) => axios.get(`${baseUrl}/user/${uid}.json`);
// const getUserByUid = (uid) => axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`);
// const getMycologistById = (mycologistId) => axios.get(`${baseUrl}/mycologists/${mycologistId}.json`);
const addUser = (newUserObj) => axios.post(`${baseUrl}/users.json`, newUserObj);

export default {
  getUsers,
  getUserById,
  getUserByUid,
  addUser,
};
