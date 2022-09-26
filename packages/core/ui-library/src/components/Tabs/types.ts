import React from 'react';

export type TabsDoRemoveTabSignature = ({ tabId }: { tabId: string }) => void;

type HandleCollapseOnClickSignature = ({ event }: { event: React.MouseEvent }) => void;

type TabbedContent = Array<{
  id: string;
  name: string;
  panel: React.ReactElement;
}>;

type TabBaseProps = {
  copy: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export type TabFullProps = TabBaseProps & {
  doRemoveTab?: TabsDoRemoveTabSignature;
  handleCollapseOnClick?: HandleCollapseOnClickSignature;
  value: string;
};

export type TabsListProps = {
  ariaLabel: string;
  doRemoveTab?: TabsDoRemoveTabSignature;
  handleCollapseOnClick?: HandleCollapseOnClickSignature;
  isCollapsible?: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  tabbedContent: TabbedContent;
};

export type TabPanelsProps = {
  activeTab?: string;
  tabbedContent: TabbedContent;
};

export type TabsProps = {
  initialActiveTab?: string;
  ariaLabel: string;
  doRemoveTab?: TabsDoRemoveTabSignature;
  isCollapsible?: boolean;
  tabbedContent: TabbedContent;
};
