import { EasyVars } from '@graphiql-v2-prototype/graphiql-plugin-operations-tools-easy-vars';

import { variableDefinitions } from '../data';

export const EasyVarsStory = () => {
  return (
    <div>
      <EasyVars variableDefinitions={variableDefinitions} />
    </div>
  );
};

EasyVarsStory.storyName = 'EasyVars';
