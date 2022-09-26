// components
import { ConnectionSettings } from '../ConnectionSettings';
import { Search } from '../Search';
import { WorkspaceNavigation } from '../WorkspaceNavigation';

// styles
import { StyledTopBar } from './styles';

export const TopBar = () => {
  return (
    <StyledTopBar>
      <ConnectionSettings />
      <WorkspaceNavigation />
      <Search />
    </StyledTopBar>
  );
};
