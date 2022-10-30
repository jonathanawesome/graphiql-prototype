type PanePlugin = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  panePluginContent: (props: any) => React.ReactElement;
  panePluginIcon: () => React.ReactElement;
  panePluginName: string;
};

export type PanePluginsArray = PanePlugin[];
