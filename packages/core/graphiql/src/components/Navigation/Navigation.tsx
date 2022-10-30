import { Icon } from '@graphiql-prototype/ui-library';

// default plugin
import { PanePluginSettings } from '@graphiql-prototype/graphiql-plugin-pane-settings';

// hooks
import { useGraphiQL } from '../../hooks';

// styles
import {
  StyledPanePluginNavigationItem,
  StyledPanePluginNavigation,
  StyledSettingsButtonWrap,
} from './styles';

// types
import { PanePluginsArray } from '../../types';

export const Navigation = ({ panePlugins }: { panePlugins: PanePluginsArray }) => {
  const { activePanePlugin, setActivePanePlugin } = useGraphiQL();

  return (
    <StyledPanePluginNavigation>
      {panePlugins?.map((panePlugin) => (
        <StyledPanePluginNavigationItem
          key={panePlugin.panePluginName}
          isActive={activePanePlugin === panePlugin.panePluginName}
          onClick={() => setActivePanePlugin(panePlugin.panePluginName)}
          title={`${activePanePlugin === panePlugin.panePluginName ? 'Close' : 'Show'} ${
            panePlugin.panePluginName
          }`}
        >
          <panePlugin.panePluginIcon />
        </StyledPanePluginNavigationItem>
      ))}
      <StyledSettingsButtonWrap>
        {activePanePlugin === 'Settings' ? (
          <StyledPanePluginNavigationItem
            isActive={activePanePlugin === PanePluginSettings.panePluginName}
            onClick={() => setActivePanePlugin(panePlugins[0].panePluginName)}
            title={`${
              activePanePlugin === PanePluginSettings.panePluginName ? 'Close' : 'Show'
            } ${PanePluginSettings.panePluginName}`}
          >
            <Icon name="Close" />
          </StyledPanePluginNavigationItem>
        ) : (
          <StyledPanePluginNavigationItem
            isActive={activePanePlugin === PanePluginSettings.panePluginName}
            onClick={() => setActivePanePlugin(PanePluginSettings.panePluginName)}
            title={`${
              activePanePlugin === PanePluginSettings.panePluginName ? 'Close' : 'Show'
            } ${PanePluginSettings.panePluginName}`}
          >
            <PanePluginSettings.panePluginIcon />
          </StyledPanePluginNavigationItem>
        )}
      </StyledSettingsButtonWrap>
    </StyledPanePluginNavigation>
  );
};
