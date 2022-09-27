import { GraphiQL } from '@graphiql-prototype/graphiql';

// pane plugins
// import { PanePluginDocs } from '@graphiql-prototype/graphiql-plugin-pane-docs';
// import { PanePluginEasyVars } from '@graphiql-prototype/graphiql-plugin-pane-easy-vars';
import { PanePluginHistory } from '@graphiql-prototype/graphiql-plugin-pane-history';
import { PanePluginPathfinder } from '@graphiql-prototype/graphiql-plugin-pane-pathfinder';

// dialog plugins
import { DialogPluginSettings } from '@graphiql-prototype/graphiql-plugin-dialog-settings';

export const Default = () => {
  return (
    <GraphiQL
      dialogPlugins={[DialogPluginSettings]}
      panePlugins={[
        PanePluginPathfinder,
        PanePluginHistory,
        // PanePluginEasyVars,
        // PanePluginDocs,
      ]}
    />
  );
};
