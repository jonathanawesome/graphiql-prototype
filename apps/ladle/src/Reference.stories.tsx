import { GraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

// pane plugins
import { PanePluginDocs } from '@graphiql-v2-prototype/graphiql-plugin-pane-docs';
import { PanePluginHistory } from '@graphiql-v2-prototype/graphiql-plugin-pane-history';
import { PanePluginPathfinder } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';

// dialog plugins
import { DialogPluginSchemaSelector } from '@graphiql-v2-prototype/graphiql-plugin-dialog-schema-selector';
import { DialogPluginSettings } from '@graphiql-v2-prototype/graphiql-plugin-dialog-settings';

export const Reference = () => {
  return (
    <GraphiQL
      panePlugins={[PanePluginPathfinder, PanePluginHistory, PanePluginDocs]}
      dialogPlugins={[DialogPluginSchemaSelector, DialogPluginSettings]}
    />
  );
};
