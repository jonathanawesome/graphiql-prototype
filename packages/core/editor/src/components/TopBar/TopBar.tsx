// components
import { ConnectionSettings } from '../ConnectionSettings';
import { Search } from '../Search';
import { WorkspaceNavigation } from '../WorkspaceNavigation';

// hooks
import { useSearch } from '../../hooks';

// styles
import { StyledTopBar } from './styles';

export const TopBar = () => {
  const { searchBarVisible } = useSearch();

  return (
    <StyledTopBar searchBarVisible={searchBarVisible}>
      <div className="hideWhenSearchVisible">
        <ConnectionSettings />
        <WorkspaceNavigation />
      </div>
      <Search />
    </StyledTopBar>
  );
};
