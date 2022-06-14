export type PanePlugin = {
  panePluginContent: () => React.ReactElement;
  panePluginIcon: () => React.ReactElement;
  panePluginName: string;
};

export type PanePluginsArray = PanePlugin[];
