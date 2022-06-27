import { getActiveEditorTab } from '@graphiql-v2-prototype/graphiql-editor';

// components
import { Pathfinder } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';

export const PathfinderStory = () => {
  const activeEditorTab = getActiveEditorTab();

  console.log(activeEditorTab);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `1fr 200px`, height: `100%` }}>
      <Pathfinder />
      {activeEditorTab?.operationModel && (
        <div>{activeEditorTab?.operationModel.getValue()}</div>
      )}
    </div>
  );
};

PathfinderStory.storyName = 'Pathfinder';
