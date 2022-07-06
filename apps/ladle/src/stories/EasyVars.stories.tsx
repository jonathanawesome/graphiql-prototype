import { EasyVars } from '@graphiql-v2-prototype/graphiql-ui-library';

import { variableDefinitions } from '../../data';

export const EasyVarsStory = () => {
  return (
    <EasyVars
      variableDefinitions={Object.values(variableDefinitions).map((value) => value)}
    />
  );
};

EasyVarsStory.storyName = 'EasyVars';
