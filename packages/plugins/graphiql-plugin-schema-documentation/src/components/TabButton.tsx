import { ReactElement } from 'react';

// hooks
import { useSchemaReference } from '../hooks';
// styles
import { StyledTabButton } from './styles';

// types
import type { TopLevelPane } from '../hooks';

export const TabButton = ({
  destinationPane,
  copy,
}: {
  destinationPane: TopLevelPane;
  copy: string | ReactElement;
}) => {
  const { activePrimaryPane, setActivePrimaryPane, clearTertiaryPaneStack } =
    useSchemaReference();

  return (
    <StyledTabButton
      isActive={activePrimaryPane === destinationPane}
      onClick={() => {
        setActivePrimaryPane({ destinationPane });
        clearTertiaryPaneStack();
      }}
    >
      {copy}
    </StyledTabButton>
  );
};
