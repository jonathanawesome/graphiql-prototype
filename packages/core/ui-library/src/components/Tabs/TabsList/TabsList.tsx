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
  setActiveTab,
  tabbedContent,
}: TabsListProps) => {
  return (
    <StyledTabsList aria-label={ariaLabel} isCollapsible={isCollapsible}>
      {tabbedContent.map((t) => (
        <Tab
          key={t.id}
          copy={t.name}
          doRemoveTab={doRemoveTab}
          handleCollapseOnClick={handleCollapseOnClick}
          setActiveTab={setActiveTab}
          value={t.id}
        />
      ))}
    </StyledTabsList>
  );
};
