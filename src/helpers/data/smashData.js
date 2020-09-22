// import ticketNumberData from "./ticketNumberData";
import ticketsData from './ticketsData';
import ticketsFollowData from './ticketsFollowData';

const getTicketsWithTicketsFollow = (ticketId) => new Promise((resolve, reject) => {
  // console.warn('sending user ID which suppose to be uid', userId);
  ticketsData.getSingleTicketById(ticketId)
    .then((response) => {
      console.warn('found what return then after that the follow', response.data);
      if (response.length === 0) {
        // console.warn('resolve nothing or null');
        resolve(response);
      } else {
        const ticket = response.data;
        ticket.id = ticketId;
        // user.id = userId;
        ticket.follow = [];
        // console.warn('THis is the user uid', user);
        ticketsFollowData.getFollows()
          .then((ticketsFollow) => {
            console.warn('this all see ticketsFollow', ticketsFollow);
            ticketsFollow.forEach((follow) => { // console.warn('this is only one follow object', follow.followTitle);
              // const selectedTickets = ticketsFollow.filter((p) => p.followId === follow.id);
              console.warn('this is follow each Ticket ', follow);
              // selectedTickets.followTitle = follow.followTitle;
              // selectedTickets.id = follow.id;
              // ticket.follows.push(follow);
            });
            console.warn('see what smash before pass it', ticket);
            resolve(ticket);
          });
      }
    })
    .catch((err) => reject(err));
});

export default { getTicketsWithTicketsFollow };
