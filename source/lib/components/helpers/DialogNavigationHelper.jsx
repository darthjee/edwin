import DialogNavigationButton from '../DialogNavigationButton.jsx';

class DialogNavigationHelper {
  static renderPrevious(showPrevious, onPrevious) {
    if (!showPrevious) {
      return null;
    }
    return (
      <DialogNavigationButton
        label="Previous"
        variant="outline-secondary"
        onClick={onPrevious}
      />
    );
  }

  static renderNext(onNext) {
    return (
      <DialogNavigationButton
        label="Next"
        variant="primary"
        className="ms-auto"
        onClick={onNext}
      />
    );
  }

  static renderNavigation(showPrevious, onPrevious, onNext) {
    return (
      <div className="d-flex mt-3">
        {DialogNavigationHelper.renderPrevious(showPrevious, onPrevious)}
        {DialogNavigationHelper.renderNext(onNext)}
      </div>
    );
  }
}

export { DialogNavigationHelper };
