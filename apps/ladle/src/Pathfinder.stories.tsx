import { getActiveEditorTab } from '@graphiql-v2-prototype/graphiql-editor';

import { useEffect, useState } from 'react';

// components
import { Pathfinder } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';

export const PathfinderStory = () => {
  const activeEditorTab = getActiveEditorTab();
  const [val, setVal] = useState<string>();

  const operationModel = activeEditorTab?.operationModel;

  useEffect(() => {
    if (operationModel) {
      setVal(operationModel.getValue());
    }
  }, [operationModel]);

  console.log(activeEditorTab);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `1fr 200px`, height: `100%` }}>
      <Pathfinder />
      <div>{val}</div>
    </div>
  );
};

PathfinderStory.storyName = 'Pathfinder';
