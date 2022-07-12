import { useEffect, useState } from 'react';
import { useGraphiQLEditor } from '@graphiql-prototype/graphiql-editor';

// components
import { Pathfinder } from '@graphiql-prototype/graphiql-plugin-pane-pathfinder';

export const PathfinderCompleteStory = () => {
  const { activeEditorTabId, editorTabs } = useGraphiQLEditor();

  const [val, setVal] = useState<string>();

  useEffect(() => {
    const activeEditorTab = editorTabs.find(
      (editorTab) => editorTab.editorTabId === activeEditorTabId
    );
    const operationModel = activeEditorTab?.operationModel;
    if (operationModel && operationModel.getValue() !== val) {
      setVal(operationModel.getValue());
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
