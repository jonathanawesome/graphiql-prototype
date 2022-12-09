// styles
import { StyledTabPanel } from './styles';

// types
import { TabPanelsProps } from '../types';

export const TabPanels = ({ selectedTab, tabbedContent }: TabPanelsProps) => {
  return (
    <>
      {tabbedContent.map((t) => {
        return (
          <div
            key={t.tabId}
            aria-labelledby={t.tabId}
            className={StyledTabPanel()}
            hidden={selectedTab !== t.tabId}
            id={t.panelId}
            role="tabpanel"
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
          >
            {t.panel}
          </div>
        );
      })}
    </>
  );
};
