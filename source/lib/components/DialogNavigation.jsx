import PropTypes from 'prop-types';

function DialogNavigation({ showPrevious = false, onPrevious, onNext }) {
  return (
    <div className="d-flex justify-content-between mt-3">
      <div>
        {showPrevious && (
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={onPrevious}
          >
            Previous
          </button>
        )}
      </div>
      <button type="button" className="btn btn-sm btn-primary" onClick={onNext}>
        Next
      </button>
    </div>
  );
}

DialogNavigation.propTypes = {
  showPrevious: PropTypes.bool,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default DialogNavigation;
