import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import silhouettePortrait from '../assets/silhouette.svg';
import { DialogBoxController } from './controllers/DialogBoxController.js';

function DialogBox({ dialog, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const messages = dialog?.messages ?? [];
  const activeMessage = messages[activeIndex] ?? null;
  const speaker = activeMessage?.character ?? null;

  useEffect(() => {
    setActiveIndex(0);
  }, [dialog]);

  const portraitSrc = useMemo(
    () => speaker?.portraitUrl || silhouettePortrait,
    [speaker]
  );
  const controller = useMemo(
    () => new DialogBoxController(onClose, setActiveIndex),
    [onClose]
  );

  if (!messages.length || !activeMessage) {return null;}

  return (
    <div className="edwin-dialog-box card mt-3" role="dialog" aria-modal="false">
      <div className="card-body">
        <div className="dialog-box__layout">
          {speaker && (
            <div className="dialog-box__speaker">
              <img src={portraitSrc} alt={speaker.name} className="dialog-box__portrait" />
              <strong className="small text-center">{speaker.name}</strong>
            </div>
          )}
          <div className="dialog-box__content">
            <p className="dialog-box__text mb-0">{activeMessage.text}</p>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div>
            {activeIndex > 0 && (
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => controller.previousMessage()}>
                Previous
              </button>
            )}
          </div>
          <button type="button" className="btn btn-sm btn-primary" onClick={() => controller.nextMessage(activeIndex, messages.length)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

DialogBox.propTypes = {
  dialog: PropTypes.shape({
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        character: PropTypes.shape({
          name: PropTypes.string.isRequired,
          portraitUrl: PropTypes.string,
        }),
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
};

export default DialogBox;
