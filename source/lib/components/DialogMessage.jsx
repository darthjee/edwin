import PropTypes from 'prop-types';

function DialogMessage({ text }) {
  return (
    <div className="dialog-box__content">
      <p className="dialog-box__text mb-0">{text}</p>
    </div>
  );
}

DialogMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DialogMessage;
