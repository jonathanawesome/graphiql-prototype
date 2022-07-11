export type DialogPlugin = {
  dialogPluginIcon: () => React.ReactElement;
  dialogPluginName: string;
  dialogPluginContent: () => React.ReactElement;
};

export type DialogPluginsArray = DialogPlugin[];
