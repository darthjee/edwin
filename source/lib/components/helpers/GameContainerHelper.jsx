import ActionPanel from '../ActionPanel.jsx';
import NPCDialog from '../NPCDialog.jsx';
import Navigation from '../Navigation.jsx';

class GameContainerHelper {
  renderActionPanel(availableActions, onAction) {
    if (!availableActions.length) {return null;}
    return (
      <div className="card mb-3">
        <div className="card-body">
          <ActionPanel actions={availableActions} onAction={onAction} />
        </div>
      </div>
    );
  }

  renderNavigationPanel(paths, onNavigate) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <Navigation
            paths={paths}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    );
  }

  renderNPCDialog(activeNPC, dialogStep, onChoose, onClose) {
    if (!activeNPC) {return null;}
    return (
      <NPCDialog
        npc={{ id: activeNPC.id, name: activeNPC.name, description: activeNPC.description }}
        currentStep={dialogStep}
        onChoose={onChoose}
        onClose={onClose}
      />
    );
  }
}

export { GameContainerHelper };
