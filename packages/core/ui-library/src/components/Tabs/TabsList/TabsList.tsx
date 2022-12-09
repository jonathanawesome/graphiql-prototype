// components
import { Tab } from '../Tab';

// styles
import { StyledTabsList } from './styles';

// types
import { TabsListProps } from '../types';

export const TabsList = ({
  ariaLabel,
  doRemoveTab,
  handleCollapseOnClick,
  isCollapsible,
  selectedTab,
  setSelectedTab,
  tabbedContent,
}: TabsListProps) => {
  return (
    <ul
      aria-label={ariaLabel}
      className={StyledTabsList({ isCollapsible })}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="tablist"
    >
      {tabbedContent.map((t) => (
        <Tab
          key={t.tabId}
          copy={t.name}
          doRemoveTab={doRemoveTab}
          handleCollapseOnClick={handleCollapseOnClick}
          isSelected={t.tabId === selectedTab}
          panelId={t.panelId}
          setSelectedTab={setSelectedTab}
          tabId={t.tabId}
        />
      ))}
    </ul>
  );
};
