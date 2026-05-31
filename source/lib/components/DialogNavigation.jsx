import PropTypes from 'prop-types';
import { DialogNavigationHelper } from './helpers/DialogNavigationHelper.jsx';

function DialogNavigation({ showPrevious = false, onPrevious, onNext }) {
  return DialogNavigationHelper.renderNavigation(showPrevious, onPrevious, onNext);
}

DialogNavigation.propTypes = {
  showPrevious: PropTypes.bool,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default DialogNavigation;
