/** components */
// import { SettingsDialog } from '../index';
import { Command, GraphQLIcon } from '@graphiql-v2-prototype/graphiql-ui-library';

/** hooks */
import { useGraphiQL } from '../../hooks';

/** styles */
import {
  NavigationStyled,
  PanePluginNavigation,
  PanePluginNavigationItem,
  SibebarPlugins,
} from './styles';

/** types */
import { PanePluginsArray } from '../PanePlugins/types';

export const Navigation = ({
  panePlugins,
  sidebarPlugins,
}: {
  panePlugins: PanePluginsArray;
  sidebarPlugins?: React.ReactElement[];
}) => {
  const { activePane, setActivePane } = useGraphiQL();

  return (
    <NavigationStyled showBorder={activePane !== 'GraphiQL'}>
      <PanePluginNavigation>
        <PanePluginNavigationItem
          isActive={activePane === 'GraphiQL'}
          onClick={() => setActivePane('GraphiQL')}
          title="SomeTitle Here"
        >
          <GraphQLIcon />
        </PanePluginNavigationItem>
        {panePlugins?.map((panePlugin) => (
          <PanePluginNavigationItem
            key={panePlugin.panePluginName}
            isActive={activePane === panePlugin.panePluginName}
            onClick={() => setActivePane(panePlugin.panePluginName)}
          >
            <panePlugin.panePluginIcon />
          </PanePluginNavigationItem>
        ))}
      </PanePluginNavigation>

      <SibebarPlugins>
        {sidebarPlugins && sidebarPlugins.map((s) => <div key={s?.toString()}>{s}</div>)}
        <div style={{ cursor: 'not-allowed' }}>
          <Command />
        </div>
        {/* <SettingsDialog /> */}
      </SibebarPlugins>
    </NavigationStyled>
  );
};
