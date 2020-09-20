// import ticketNumberData from "./ticketNumberData";
import ticketsData from './ticketsData';
import ticketsFollowData from './ticketsFollowData';

const getTicketsWithTicketsFollow = (ticketId) => new Promise((resolve, reject) => {
  // console.warn('sending user ID which suppose to be uid', userId);
  ticketsData.getSingleTicketById(ticketId)
    .then((response) => {
      // console.warn('found what return then after that the follow', response);
      if (response.length === 0) {
        // console.warn('resolve nothing or null');
        resolve(response);
      } else {
        const ticket = response[0];
        // user.id = userId;
        ticket.follow = [];
        // console.warn('THis is the user uid', user);
        ticketsFollowData.getTicketsFollowByTickNumber(ticket.ticketNumber)
          .then((ticketsFollow) => {
            // console.warn('this all tickets', tickets);
            ticketsFollow.forEach((follow) => { // console.warn('this is only one follow object', follow.followTitle);
              const selectedTickets = ticketsFollow.filter((p) => p.followId === follow.id);
              // console.warn('this is selected tickets ', selectedtickets);
              selectedTickets.followTitle = follow.followTitle;
              selectedTickets.id = follow.id;
              ticket.follows.push(selectedTickets);
            });
            resolve(ticket);
          });
      }
    })
    .catch((err) => reject(err));
});

export default { getTicketsWithTicketsFollow };
