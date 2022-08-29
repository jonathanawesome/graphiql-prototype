import { GraphiQL } from '@graphiql-prototype/graphiql';

// pane plugins
import { PanePluginDocs } from '@graphiql-prototype/graphiql-plugin-pane-docs';
import { PanePluginEasyVars } from '@graphiql-prototype/graphiql-plugin-pane-easy-vars';
import { PanePluginHistory } from '@graphiql-prototype/graphiql-plugin-pane-history';
import { PanePluginPathfinder } from '@graphiql-prototype/graphiql-plugin-pane-pathfinder';

// dialog plugins
import { DialogPluginSchemaSelector } from '@graphiql-prototype/graphiql-plugin-dialog-schema-selector';
import { DialogPluginSettings } from '@graphiql-prototype/graphiql-plugin-dialog-settings';

export const Default = () => {
  return (
    <GraphiQL
      panePlugins={[
        PanePluginPathfinder,
        PanePluginHistory,
        PanePluginEasyVars,
        PanePluginDocs,
      ]}
      dialogPlugins={[DialogPluginSchemaSelector, DialogPluginSettings]}
    />
  );
};
