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
    <StyledTabsList aria-label={ariaLabel} isCollapsible={isCollapsible} role="tablist">
      {tabbedContent.map((t) => (
        <>
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
          <div
            key={t.tabId}
            aria-labelledby={t.tabId}
            hidden={selectedTab !== t.tabId}
            id={t.panelId}
            role="tabpanel"
          >
            {t.panel}
          </div>
        </>
      ))}
    </StyledTabsList>
  );
};
