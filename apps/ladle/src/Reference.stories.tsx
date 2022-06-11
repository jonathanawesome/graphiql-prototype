import { GraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

import { History } from '@graphiql-v2-prototype/graphiql-plugin-pane-history';
import { Pathfinder } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';
import { SchemaSelector } from '@graphiql-v2-prototype/graphiql-plugin-dialog-schema-selector';

export const Reference = () => {
  return (
    <GraphiQL panePlugins={[Pathfinder, History]} sidebarPlugins={[<SchemaSelector />]} />
  );
};
