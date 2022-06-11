export type PanePlugin = {
  panePluginIcon: () => React.ReactElement;
  panePluginName: string;
  panePluginContent: () => React.ReactElement;
};

export type PanePluginsArray = PanePlugin[];
