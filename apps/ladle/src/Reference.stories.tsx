import { GraphiQL } from '@graphiql-v2-prototype/graphiql-v2';
import { SchemaSelector } from '@graphiql-v2-prototype/graphiql-plugin-sidebar-schema-selector';
export const Reference = () => {
  //TODO initialize a dummy plugin
  // input a default schema url
  return <GraphiQL sidebarPlugins={[<SchemaSelector />]} />;
};
