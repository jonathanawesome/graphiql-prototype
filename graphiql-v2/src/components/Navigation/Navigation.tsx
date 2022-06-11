/** components */
import { SettingsDialog } from '../index';
import {
  Command,
  // Docs,
  GraphQLIcon,
  // History
} from '@graphiql-v2-prototype/graphiql-ui-library';

/** styles */
import {
  NavigationStyled,
  PanePluginNavigation,
  PanePluginNavigationItem,
  SibebarPlugins,
} from './styles';
import { PanePluginsArray } from '../PanePlugins/types';
import { useGraphiQL } from '../../hooks';

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
        <PanePluginNavigationItem onClick={() => setActivePane('GraphiQL')}>
          <GraphQLIcon />
        </PanePluginNavigationItem>

        {/* <Docs /> */}
        {/* <div style={{ cursor: 'not-allowed' }}>
          <History />
        </div> */}
        {panePlugins?.map((panePlugin) => (
          <PanePluginNavigationItem
            key={panePlugin.panePluginName}
            onClick={() => setActivePane(panePlugin.panePluginName)}
          >
            {panePlugin.panePluginIcon}
          </PanePluginNavigationItem>
        ))}
      </PanePluginNavigation>

      <SibebarPlugins>
        {sidebarPlugins && sidebarPlugins.map((s) => <div key={s?.toString()}>{s}</div>)}
        <div style={{ cursor: 'not-allowed' }}>
          <Command />
        </div>
        <SettingsDialog />
      </SibebarPlugins>
    </NavigationStyled>
  );
};
