import { useState } from 'react';
import { ADD_VIEW_NAME, WorkspaceForm } from './pop-up/add-workspace';
import { LIST_VIEW_NAME, WorkspaceList } from './pop-up/list-workspaces';

function PopUp() {
  const [currentView, setCurrentView] = useState(ADD_VIEW_NAME);
  return (
    <>
      {currentView === LIST_VIEW_NAME ? (
        <WorkspaceList currentView={currentView} setCurrentView={setCurrentView} />
      ) : currentView === ADD_VIEW_NAME ? (
        <WorkspaceForm currentView={currentView} setCurrentView={setCurrentView} />
      ) : (
        <div>Invalid View</div>
      )}
    </>
  );
}

export { PopUp };
