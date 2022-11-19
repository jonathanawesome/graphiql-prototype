import { useEffect, useState } from 'react';
import { useEditor } from '@graphiql-prototype/store';

// components
import { Pathfinder } from '@graphiql-prototype/graphiql-plugin-pane-pathfinder';

export const PathfinderCompleteStory = () => {
  const { activeEditorTabId, editorTabs } = useEditor();

  const [val, setVal] = useState<string>();

  useEffect(() => {
    const activeEditorTab = editorTabs.find(
      (editorTab) => editorTab.editorTabId === activeEditorTabId
    );
    const operationsModel = activeEditorTab?.operationsModel;
    if (operationsModel && operationsModel.getValue() !== val) {
      setVal(operationsModel.getValue());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorTabs]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `1fr 200px`, height: `100%` }}>
      <Pathfinder />
      <div>{val}</div>
    </div>
  );
};

PathfinderCompleteStory.storyName = 'Pathfinder';
