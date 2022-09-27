// default plugin
import { PanePluginSettings } from '@graphiql-prototype/graphiql-plugin-pane-settings';
import { Icon } from '@graphiql-prototype/ui-library';

// hooks
import { useGraphiQL } from '../../hooks';

// styles
import {
  PanePluginContainer,
  PanePluginContainerWrap,
  PanePluginNavigationItem,
  PanePluginNavigation,
  StyledSettingsButtonWrap,
} from './styles';

// types
import { PanePluginsArray } from './types';

export const PanePlugins = ({
  activePane,
  panePlugins,
}: {
  activePane: string;
  panePlugins: PanePluginsArray;
}) => {
  const { activePanePlugin, setActivePanePlugin } = useGraphiQL();

  const activePaneContent = [...panePlugins, PanePluginSettings].find(
    (panePlugin) => panePlugin.panePluginName === activePane
  );

  // TODO
  if (!activePaneContent) {
    return <p>loading pane...</p>;
  }

  return (
    <PanePluginContainerWrap>
      <PanePluginNavigation>
        {panePlugins?.map((panePlugin) => (
          <PanePluginNavigationItem
            key={panePlugin.panePluginName}
            isActive={activePanePlugin === panePlugin.panePluginName}
            onClick={() => setActivePanePlugin(panePlugin.panePluginName)}
            title={`${
              activePanePlugin === panePlugin.panePluginName ? 'Close' : 'Show'
            } ${panePlugin.panePluginName}`}
          >
            <panePlugin.panePluginIcon />
          </PanePluginNavigationItem>
        ))}
        <StyledSettingsButtonWrap>
          {activePanePlugin === 'Settings' ? (
            <PanePluginNavigationItem
              isActive={activePanePlugin === PanePluginSettings.panePluginName}
              onClick={() => setActivePanePlugin(panePlugins[0].panePluginName)}
              title={`${
                activePanePlugin === PanePluginSettings.panePluginName ? 'Close' : 'Show'
              } ${PanePluginSettings.panePluginName}`}
            >
              <Icon name="Close" />
            </PanePluginNavigationItem>
          ) : (
            <PanePluginNavigationItem
              isActive={activePanePlugin === PanePluginSettings.panePluginName}
              onClick={() => setActivePanePlugin(PanePluginSettings.panePluginName)}
              title={`${
                activePanePlugin === PanePluginSettings.panePluginName ? 'Close' : 'Show'
              } ${PanePluginSettings.panePluginName}`}
            >
              <PanePluginSettings.panePluginIcon />
            </PanePluginNavigationItem>
          )}
        </StyledSettingsButtonWrap>
      </PanePluginNavigation>
      <PanePluginContainer>
        <activePaneContent.panePluginContent />
      </PanePluginContainer>
    </PanePluginContainerWrap>
  );
};
