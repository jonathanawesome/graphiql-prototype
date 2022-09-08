import React, { SetStateAction, useState } from 'react';

// components
import { ChevronLarge } from '../../icons';
import { TabsList } from './TabsList';
import { TabPanels } from './TabPanels';

// styles
import {
  StyledCollapsibleContent,
  StyledCollapsibleRoot,
  StyledCollapsibleTrigger,
  StyledTabsRoot,
} from './styles';

// types
import { TabsProps } from './types';

const NotCollapsible = ({
  ariaLabel,
  activeTab,
  setActiveTab,
  doRemoveTab,
  tabbedContent,
}: TabsProps & {
  activeTab: string;
  setActiveTab: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <StyledTabsRoot defaultValue={tabbedContent[0].id}>
      <TabsList
        ariaLabel={ariaLabel}
        doRemoveTab={doRemoveTab}
        setActiveTab={setActiveTab}
        tabbedContent={tabbedContent}
      />
      <TabPanels activeTab={activeTab} tabbedContent={tabbedContent} />
    </StyledTabsRoot>
  );
};

const Collapsible = ({
  ariaLabel,
  activeTab,
  setActiveTab,
  doRemoveTab,
  tabbedContent,
}: TabsProps & {
  activeTab: string;
  setActiveTab: React.Dispatch<SetStateAction<string>>;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCollapseOnClick = ({ event }: { event: React.MouseEvent }) => {
    const targetValue = event.currentTarget.getAttribute('data-value');
    // console.log('handleCollapseOnClick', {
    //   activeTab,
    //   targetValue,
    // });
    if (activeTab === targetValue && isOpen) {
      setIsOpen(false);
    }
    if (activeTab === targetValue && !isOpen) {
      setIsOpen(true);
    }
    if (activeTab !== targetValue && !isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <StyledCollapsibleRoot
      open={isOpen}
      onOpenChange={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
    >
      <StyledTabsRoot value={activeTab}>
        <TabsList
          ariaLabel={ariaLabel}
          doRemoveTab={doRemoveTab}
          handleCollapseOnClick={handleCollapseOnClick}
          isCollapsible={true}
          setActiveTab={setActiveTab}
          tabbedContent={tabbedContent}
        />
        <StyledCollapsibleTrigger isOpen={isOpen}>
          <ChevronLarge />
        </StyledCollapsibleTrigger>
        <StyledCollapsibleContent forceMount hidden={!isOpen}>
          <TabPanels activeTab={activeTab} tabbedContent={tabbedContent} />
        </StyledCollapsibleContent>
      </StyledTabsRoot>
    </StyledCollapsibleRoot>
  );
};

export const Tabs = ({
  ariaLabel,
  doRemoveTab,
  isCollapsible = false,
  tabbedContent,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabbedContent[0].id);

  if (isCollapsible) {
    return (
      <Collapsible
        ariaLabel={ariaLabel}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        doRemoveTab={doRemoveTab}
        tabbedContent={tabbedContent}
      />
    );
  }
  return (
    <NotCollapsible
      ariaLabel={ariaLabel}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      doRemoveTab={doRemoveTab}
      tabbedContent={tabbedContent}
    />
  );
};
