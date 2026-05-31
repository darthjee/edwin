import PropTypes from 'prop-types';

function DialogNavigationButton({ label, variant, className = '', onClick }) {
  return (
    <button
      type="button"
      className={`btn btn-sm btn-${variant} ${className}`.trim()}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </button>
  );
}

DialogNavigationButton.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default DialogNavigationButton;
