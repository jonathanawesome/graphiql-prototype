// components
import { RemoveTabButton } from '../RemoveTabButton';

// styles
import { StyledTab, StyledTabTrigger } from './styles';

//types
import { TabProps } from '../types';

export const Tab = ({
  copy,
  doRemoveTab,
  handleCollapseOnClick,
  isSelected,
  panelId,
  setSelectedTab,
  tabId,
}: TabProps) => {
  return (
    <li className={StyledTab()} role="presentation">
      <button
        aria-selected={isSelected}
        aria-controls={panelId}
        className={StyledTabTrigger({ hasRemoveTabButton: !!doRemoveTab })}
        id={tabId}
        onPointerDown={(event) => {
          setSelectedTab(tabId);
          handleCollapseOnClick ? handleCollapseOnClick({ event }) : undefined;
        }}
        role="tab"
        tabIndex={-1}
      >
        {copy}
      </button>
      {doRemoveTab && <RemoveTabButton doRemoveTab={doRemoveTab} tabId={tabId} />}
    </li>
  );
};
