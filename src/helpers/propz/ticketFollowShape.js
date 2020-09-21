import PropTypes from 'prop-types';

const ticketFollowShape = PropTypes.shape({
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imgUrlFollow: PropTypes.string.isRequired,
  isImg: PropTypes.bool.isRequired,
  isImgFollow: PropTypes.bool.isRequired,
  replayName: PropTypes.string.isRequired,
  ticketId: PropTypes.string.isRequired,
  ticketNumber: PropTypes.number.isRequired,
  uDate: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { ticketFollowShape };
