import { getActiveEditorTab } from '@graphiql-v2-prototype/graphiql-editor';

/** components */
import { Pathfinder } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';

export const PathfinderStory = () => {
  const activeEditorTab = getActiveEditorTab();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `1fr 200px`, height: `100%` }}>
      <Pathfinder />
      {activeEditorTab?.operation && <div>{activeEditorTab?.operation}</div>}
    </div>
  );
};

PathfinderStory.storyName = 'Pathfinder';
