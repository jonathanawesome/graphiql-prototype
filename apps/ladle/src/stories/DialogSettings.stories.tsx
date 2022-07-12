import { DialogPluginSettings } from '@graphiql-prototype/graphiql-plugin-dialog-settings';

const { dialogPluginContent } = DialogPluginSettings;
export const SettingsStory = () => {
  const Component = dialogPluginContent;
  return <Component />;
};

SettingsStory.storyName = 'Settings';
