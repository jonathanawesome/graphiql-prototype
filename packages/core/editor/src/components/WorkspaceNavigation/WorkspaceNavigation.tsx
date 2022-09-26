// hooks
import { useEditorPanes } from '../../hooks';

// styles
import { StyledWorkspaceNavigation, StyledWorkspaceNavigationButton } from './styles';

export const WorkspaceNavigation = () => {
  const { activePane, setActivePane } = useEditorPanes();

  return (
    <StyledWorkspaceNavigation>
      <StyledWorkspaceNavigationButton
        isActive={activePane === 'EDITOR'}
        onClick={() => setActivePane({ destinationPane: 'EDITOR' })}
      >
        Editor
      </StyledWorkspaceNavigationButton>
      <StyledWorkspaceNavigationButton
        isActive={activePane === 'SCHEMA'}
        onClick={() => setActivePane({ destinationPane: 'SCHEMA' })}
      >
        Schema
      </StyledWorkspaceNavigationButton>
    </StyledWorkspaceNavigation>
  );
};
