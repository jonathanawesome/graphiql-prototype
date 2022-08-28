import { useEffect } from 'react';

// components
import { Analyze } from '../Analyze/Analyze';
import { Header } from '../Header';
import { Operate } from '../Operate';
import { Resizer } from '@graphiql-prototype/ui-library';

// hooks
import { useEditor } from '@graphiql-prototype/use-editor';

// styles
import { EditorWrap, EditorInner } from './styles';

export const GraphiQLEditor = () => {
  const { activeEditorTabId, switchEditorTab } = useEditor();

  // console.log('rendering GraphiQLEditor', {});

  useEffect(() => {
    if (activeEditorTabId) {
      switchEditorTab({ editorTabId: activeEditorTabId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditorWrap>
      <EditorInner>
        <Header />
        <Resizer
          direction="horizontal"
          handleStyle="bar"
          pane1={{
            initialFlexGrowValue: 1,
            component: <Operate />,
          }}
          pane2={{
            component: <Analyze />,
          }}
        />
      </EditorInner>
    </EditorWrap>
  );
};
