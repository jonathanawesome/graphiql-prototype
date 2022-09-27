// components
import { Close } from '../../../icons';

// styles
import { StyledRemoveTabButton } from './styles';

// types
import { TabsDoRemoveTabSignature } from '../types';

export const RemoveTabButton = ({
  doRemoveTab,
  tabId,
}: {
  doRemoveTab: TabsDoRemoveTabSignature;
  tabId: string;
}) => {
  return (
    <StyledRemoveTabButton aria-label="Remove Tab" onClick={() => doRemoveTab({ tabId })}>
      <Close />
    </StyledRemoveTabButton>
  );
};
