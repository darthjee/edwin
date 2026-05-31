import PropTypes from 'prop-types';

function DialogMessage({ text }) {
  return <p className="dialog-box__text mb-0">{text}</p>;
}

DialogMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DialogMessage;
