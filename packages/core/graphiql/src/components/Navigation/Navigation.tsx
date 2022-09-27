// components
// import { GraphQLIcon } from '@graphiql-prototype/ui-library';
import { DialogPlugins } from '../DialogPlugins';

// hooks
import { useGraphiQL } from '../../hooks';

// styles
import {
  NavigationStyled,
  PanePluginNavigation,
  PanePluginNavigationItem,
} from './styles';

// types
import { PanePluginsArray } from '../PanePlugins/types';
import { DialogPluginsArray } from '../DialogPlugins/types';

export const Navigation = ({
  panePlugins,
  dialogPlugins,
}: {
  panePlugins: PanePluginsArray;
  dialogPlugins: DialogPluginsArray;
}) => {
  const { activePanePlugin, setActivePanePlugin } = useGraphiQL();

  return (
    <NavigationStyled>
      <PanePluginNavigation>
        {panePlugins?.map((panePlugin) => (
          <PanePluginNavigationItem
            key={panePlugin.panePluginName}
            isActive={activePanePlugin === panePlugin.panePluginName}
            onClick={() => {
              if (activePanePlugin === panePlugin.panePluginName) {
                setActivePanePlugin('GraphiQL');
              } else {
                setActivePanePlugin(panePlugin.panePluginName);
              }
            }}
            title={`${
              activePanePlugin === panePlugin.panePluginName ? 'Close' : 'Show'
            } ${panePlugin.panePluginName}`}
          >
            <panePlugin.panePluginIcon />
          </PanePluginNavigationItem>
        ))}
      </PanePluginNavigation>

      <DialogPlugins dialogPlugins={dialogPlugins} />
    </NavigationStyled>
  );
};
