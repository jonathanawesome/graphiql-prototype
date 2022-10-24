import React from 'react';

export type TabsDoRemoveTabSignature = ({ tabId }: { tabId: string }) => void;

export type HandleCollapseOnClickSignature = ({
  event,
}: {
  event: React.MouseEvent;
}) => void;

export type TabProps = {
  copy: string;
  doRemoveTab?: TabsDoRemoveTabSignature;
  handleCollapseOnClick?: HandleCollapseOnClickSignature;
  isSelected: boolean;
  panelId: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  tabId: string;
};

type TabbedContent = Array<{
  name: string;
  panel: React.ReactElement;
  panelId: string;
  tabId: string;
}>;

export type TabsListProps = {
  ariaLabel: string;
  doRemoveTab?: TabsDoRemoveTabSignature;
  handleCollapseOnClick?: HandleCollapseOnClickSignature;
  isCollapsible?: boolean;
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  tabbedContent: TabbedContent;
};

export type TabPanelsProps = {
  selectedTab?: string;
  tabbedContent: TabbedContent;
};

export type TabsProps = {
  initialSelectedTab?: string;
  ariaLabel: string;
  doRemoveTab?: TabsDoRemoveTabSignature;
  isCollapsible?: boolean;
  tabbedContent: TabbedContent;
};
