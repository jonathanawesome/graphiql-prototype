import { GraphiQL } from '@graphiql-prototype/graphiql';

// pane plugins
import { PanePluginHistory } from '@graphiql-prototype/graphiql-plugin-pane-history';
import { PanePluginPathfinder } from '@graphiql-prototype/graphiql-plugin-pane-pathfinder';

export const Default = () => {
  return <GraphiQL panePlugins={[PanePluginPathfinder, PanePluginHistory]} />;
};
