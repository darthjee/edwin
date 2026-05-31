import PropTypes from 'prop-types';
import silhouettePortrait from '../assets/silhouette.svg';

function DialogSpeaker({ speaker }) {
  if (!speaker) {return null;}

  return (
    <div className="dialog-box__speaker">
      <img
        src={speaker.portraitUrl || silhouettePortrait}
        alt={speaker.name}
        className="dialog-box__portrait"
      />
      <strong className="small text-center">{speaker.name}</strong>
    </div>
  );
}

DialogSpeaker.propTypes = {
  speaker: PropTypes.shape({
    name: PropTypes.string.isRequired,
    portraitUrl: PropTypes.string,
  }),
};

export default DialogSpeaker;
