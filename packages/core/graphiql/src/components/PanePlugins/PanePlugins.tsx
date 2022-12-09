// default plugin
import { PanePluginSettings } from '@graphiql-prototype/graphiql-plugin-pane-settings';

// styles
import {
  StyledPanePluginContainer,
  StyledPanePluginContainerWrap,
  StyledPanePluginNavigationItem,
  StyledPanePluginNavigation,
  StyledSettingsButtonWrap,
} from './styles';

// types
import { PanePluginsArray } from '../../types';

export const PanePlugins = ({
  activePane,
  panePlugins,
}: {
  activePane: string;
  panePlugins: PanePluginsArray;
}) => {
  const activePaneContent = [...panePlugins, PanePluginSettings].find(
    (panePlugin) => panePlugin.panePluginName === activePane
  );

  // TODO
  if (!activePaneContent) {
    return <p>loading pane...</p>;
  }

  return (
    <div className={StyledPanePluginContainerWrap()}>
      <div className={StyledPanePluginNavigation()}>
        {panePlugins?.map((panePlugin) => (
          <button
            className={StyledPanePluginNavigationItem({
              isActive: activePanePlugin === panePlugin.panePluginName,
            })}
            key={panePlugin.panePluginName}
            onClick={() => setActivePanePlugin(panePlugin.panePluginName)}
            title={`${
              activePanePlugin === panePlugin.panePluginName ? 'Close' : 'Show'
            } ${panePlugin.panePluginName}`}
          >
            <panePlugin.panePluginIcon />
          </button>
        ))}
        <div className={StyledSettingsButtonWrap()}>
          {activePanePlugin === 'Settings' ? (
            <button
              className={StyledPanePluginNavigationItem({
                isActive: activePanePlugin === PanePluginSettings.panePluginName,
              })}
              onClick={() => setActivePanePlugin(panePlugins[0].panePluginName)}
              title={`${
                activePanePlugin === PanePluginSettings.panePluginName ? 'Close' : 'Show'
              } ${PanePluginSettings.panePluginName}`}
            >
              <Icon name="Close" />
            </button>
          ) : (
            <button
              className={StyledPanePluginNavigationItem({
                isActive: activePanePlugin === PanePluginSettings.panePluginName,
              })}
              onClick={() => setActivePanePlugin(PanePluginSettings.panePluginName)}
              title={`${
                activePanePlugin === PanePluginSettings.panePluginName ? 'Close' : 'Show'
              } ${PanePluginSettings.panePluginName}`}
            >
              <PanePluginSettings.panePluginIcon />
            </button>
          )}
        </div>
      </div>
      <div className={StyledPanePluginContainer()}>
        <activePaneContent.panePluginContent />
      </div>
    </div>
  );
};
