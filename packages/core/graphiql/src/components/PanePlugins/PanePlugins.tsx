// components
import { Button } from '@graphiql-prototype/ui-library';

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

  const activePaneContent = panePlugins.find(
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
          <Button
            action={() => console.log('settings')}
            icon="Gear"
            label="Pathfinder settings"
            size="LARGE"
            variant="ICON"
          />
        </StyledSettingsButtonWrap>
      </PanePluginNavigation>
      <PanePluginContainer>
        <activePaneContent.panePluginContent />
      </PanePluginContainer>
    </PanePluginContainerWrap>
  );
};
