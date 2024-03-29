// components
import { Icon } from '../../Icon';

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
    <button
      aria-label="Remove Tab"
      className={StyledRemoveTabButton()}
      onClick={() => doRemoveTab({ tabId })}
    >
      <Icon name="Close" />
    </button>
  );
};
