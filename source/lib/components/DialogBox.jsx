import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DialogBoxController } from './controllers/DialogBoxController.js';
import { DialogBoxHelper } from './helpers/DialogBoxHelper.jsx';

function DialogBox({ dialog, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const messages = dialog?.messages ?? [];
  const activeMessage = messages[activeIndex] ?? null;
  const speaker = activeMessage?.character ?? null;

  useEffect(() => {
    setActiveIndex(0);
  }, [dialog]);

  const controller = useMemo(
    () => new DialogBoxController(onClose, setActiveIndex),
    [onClose]
  );
  const handlePrevious = useCallback(
    () => controller.previousMessage(),
    [controller]
  );
  const handleNext = useCallback(
    () => controller.nextMessage(activeIndex, messages.length),
    [activeIndex, controller, messages.length]
  );
  if (!messages.length || !activeMessage) {
    return null;
  }

  return DialogBoxHelper.renderDialog({
    activeMessage,
    speaker,
    showPrevious: activeIndex > 0,
    onPrevious: handlePrevious,
    onNext: handleNext,
  });
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
