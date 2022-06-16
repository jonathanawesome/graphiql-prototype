import { getActiveEditorTab } from '@graphiql-v2-prototype/graphiql-editor';
import { EasyVars } from '@graphiql-v2-prototype/graphiql-plugin-operations-tools-easy-vars';

import { variableDefinitions } from '../data';

export const EasyVarsStory = () => {
  const activeEditorTab = getActiveEditorTab();
  const variables = activeEditorTab?.variables;

  console.log('variables', variables);

  return (
    <div>
      <EasyVars variableDefinitions={variableDefinitions} variables={variables || '{}'} />
      {variables && variables}
    </div>
  );
};

EasyVarsStory.storyName = 'EasyVars';
