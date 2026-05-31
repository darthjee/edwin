import DialogNavigation from '../DialogNavigation.jsx';
import DialogSpeaker from '../DialogSpeaker.jsx';

class DialogBoxHelper {
  static renderDialog({ activeMessage, speaker, showPrevious, onPrevious, onNext }) {
    return (
      <div className="edwin-dialog-box card mt-3" role="dialog" aria-modal="false">
        <div className="card-body">
          <div className="dialog-box__layout">
            <DialogSpeaker speaker={speaker} />
            <div className="dialog-box__content">
              <p className="dialog-box__text mb-0">{activeMessage.text}</p>
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
