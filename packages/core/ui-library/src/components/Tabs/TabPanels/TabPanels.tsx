// styles
import { StyledTabPanels } from './styles';

// types
import { TabPanelsProps } from '../types';

export const TabPanels = ({ activeTab, tabbedContent }: TabPanelsProps) => {
  return (
    <>
      {tabbedContent.map((t) => {
        return (
          <StyledTabPanels key={t.id} value={t.id} forceMount hidden={activeTab !== t.id}>
            {t.panel}
          </StyledTabPanels>
        );
      })}
    </>
  );
};
