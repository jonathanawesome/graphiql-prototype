// components
// import { GraphQLIcon } from '@graphiql-v2-prototype/graphiql-ui-library';
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
  const { activePane, setActivePane } = useGraphiQL();

  return (
    <NavigationStyled showBorder={activePane !== 'GraphiQL'}>
      <PanePluginNavigation>
        {/* <PanePluginNavigationItem
          isActive={activePane === 'GraphiQL'}
          onClick={() => setActivePane('GraphiQL')}
          //TODO remove/replace
          title="GraphiQL"
        >
          <GraphQLIcon />
        </PanePluginNavigationItem> */}
        {panePlugins?.map((panePlugin) => (
          <PanePluginNavigationItem
            key={panePlugin.panePluginName}
            isActive={activePane === panePlugin.panePluginName}
            onClick={() => {
              if (activePane === panePlugin.panePluginName) {
                setActivePane('GraphiQL');
              } else {
                setActivePane(panePlugin.panePluginName);
              }
            }}
            title={`${activePane === panePlugin.panePluginName ? 'Close' : 'Show'} ${
              panePlugin.panePluginName
            }`}
          >
            <panePlugin.panePluginIcon />
          </PanePluginNavigationItem>
        ))}
      </PanePluginNavigation>

      <DialogPlugins dialogPlugins={dialogPlugins} />
    </NavigationStyled>
  );
};
