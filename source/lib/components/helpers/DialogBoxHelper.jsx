import DialogNavigation from '../DialogNavigation.jsx';
import DialogSpeaker from '../DialogSpeaker.jsx';
import DialogMessage from '../DialogMessage.jsx';

class DialogBoxHelper {
  static renderDialog({ activeMessage, speaker, showPrevious, onPrevious, onNext }) {
    return (
      <div className="edwin-dialog-box card mt-3" role="dialog" aria-modal="false">
        <div className="card-body">
          <div className="dialog-box__layout">
            <DialogSpeaker speaker={speaker} />
            <div className="dialog-box__content">
              <DialogMessage text={activeMessage.text} />
            </div>
          </div>

          <DialogNavigation
            showPrevious={showPrevious}
            onPrevious={onPrevious}
            onNext={onNext}
          />
        </div>
      </div>
    );
  }
}

export { DialogBoxHelper };
