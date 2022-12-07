import { useEffect, useState } from 'react';

// components
import { TabsList } from './TabsList';
import { TabPanels } from './TabPanels';

// styles
import { StyledTabs } from './styles';

// types
import { TabsProps } from './types';

export const Tabs = ({
  initialSelectedTab,
  ariaLabel,
  doRemoveTab,
  // isCollapsible = false,
  tabbedContent,
}: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    initialSelectedTab || tabbedContent[0].tabId
  );
  // console.log('Tabs', { selectedTab, initialSelectedTab });

  useEffect(() => {
    setSelectedTab(initialSelectedTab || tabbedContent[0].tabId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSelectedTab]);

  return (
    <section className={StyledTabs()}>
      <TabsList
        ariaLabel={ariaLabel}
        doRemoveTab={doRemoveTab}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabbedContent={tabbedContent}
      />
      <TabPanels selectedTab={selectedTab} tabbedContent={tabbedContent} />
    </section>
  );
};
