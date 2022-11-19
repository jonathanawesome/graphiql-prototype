// styles
import { StyledTabPanel } from './styles';

// types
import { TabPanelsProps } from '../types';

export const TabPanels = ({ selectedTab, tabbedContent }: TabPanelsProps) => {
  return (
    <>
      {tabbedContent.map((t) => {
        return (
          <StyledTabPanel
            key={`${t.tabId}-${t.panelId}`}
            aria-labelledby={t.tabId}
            hidden={selectedTab !== t.tabId}
            id={t.panelId}
            role="tabpanel"
            tabIndex={0}
          >
            {t.panel}
          </StyledTabPanel>
        );
      })}
    </>
  );
};
