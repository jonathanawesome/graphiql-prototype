// components
import { Editor } from '../Editor';
import { Schema } from '@graphiql-prototype/graphiql-plugin-schema-documentation';
import { TopBar } from '../TopBar';

// hooks
import { useEditorPanes } from '../../hooks';

// styles
import { EditorWrap, EditorInner } from './styles';

export const GraphiQLEditor = () => {
  const { activePane } = useEditorPanes();

  return (
    <EditorWrap>
      <EditorInner activePane={activePane}>
        <TopBar />
        {activePane === 'EDITOR' && <Editor />}
        {activePane === 'SCHEMA' && <Schema />}
      </EditorInner>
    </EditorWrap>
  );
};
