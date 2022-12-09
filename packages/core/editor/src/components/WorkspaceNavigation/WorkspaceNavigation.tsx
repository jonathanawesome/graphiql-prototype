// hooks
import { useEditorPanes } from '../../hooks';

// styles
import { StyledWorkspaceNavigation, StyledWorkspaceNavigationButton } from './styles';

export const WorkspaceNavigation = () => {
  const { activePane, setActivePane } = useEditorPanes();

  return (
    <div className={StyledWorkspaceNavigation()}>
      <button
        className={StyledWorkspaceNavigationButton({ isActive: activePane === 'EDITOR' })}
        onClick={() => setActivePane({ destinationPane: 'EDITOR' })}
      >
        Editor
      </button>
      <button
        className={StyledWorkspaceNavigationButton({ isActive: activePane === 'SCHEMA' })}
        onClick={() => setActivePane({ destinationPane: 'SCHEMA' })}
      >
        Schema
      </button>
    </div>
  );
};
