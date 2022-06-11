import { GraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

import {
  Compass,
  Pathfinder,
} from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';
import { SchemaSelector } from '@graphiql-v2-prototype/graphiql-plugin-sidebar-schema-selector';

export const Reference = () => {
  //TODO initialize a dummy plugin
  // input a default schema url
  return (
    <GraphiQL
      panePlugins={[
        {
          panePluginContent: <Pathfinder />,
          panePluginIcon: <Compass />,
          panePluginName: 'Pathfinder',
        },
      ]}
      sidebarPlugins={[<SchemaSelector />]}
    />
  );
};

// {
//   panePluginIcon: React.ReactElement;
//   panePluginName: string;
//   panePluginContent: React.ReactElement;
// }
