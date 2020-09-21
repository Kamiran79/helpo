import PropTypes from 'prop-types';

const ticketShape = PropTypes.shape({
  ticketNumber: PropTypes.number.isRequired,
  cUid: PropTypes.string.isRequired,
  oDate: PropTypes.string.isRequired,
  cDate: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  assignTo: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  dDate: PropTypes.string.isRequired,
  resolution: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { ticketShape };
