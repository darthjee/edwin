import ActionPanel from '../ActionPanel.jsx';
import Navigation from '../Navigation.jsx';
import NPCDialog from '../NPCDialog.jsx';

class GameContainerHelper {
  renderActionPanel(hasActiveDialog, availableActions, onAction) {
    if (hasActiveDialog || !availableActions.length) {return null;}
    return (
      <div className="card mb-3">
        <div className="card-body">
          <ActionPanel actions={availableActions} onAction={onAction} />
        </div>
      </div>
    );
  }

  renderNavigationPanel(hasActiveDialog, paths, onNavigate) {
    if (hasActiveDialog) {return null;}
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
