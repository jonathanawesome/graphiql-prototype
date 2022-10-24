// components
import { Editor } from '../Editor';
import { Schema } from '@graphiql-prototype/graphiql-plugin-schema-documentation';
import { TopBar } from '../TopBar';

// hooks
import { useEditorPanes } from '../../hooks';

// styles
import {
  StyledGraphiQLEditor,
  StyledGraphiQLEditorInner,
  StyledEditorWrap,
  StyledSchemaWrap,
} from './styles';

export const GraphiQLEditor = () => {
  const { activePane } = useEditorPanes();

  return (
    <StyledGraphiQLEditor>
      <StyledGraphiQLEditorInner activePane={activePane}>
        <TopBar />
        <StyledEditorWrap isActive={activePane === 'EDITOR'}>
          <Editor />
        </StyledEditorWrap>
        <StyledSchemaWrap isActive={activePane === 'SCHEMA'}>
          <Schema />
        </StyledSchemaWrap>
      </StyledGraphiQLEditorInner>
    </StyledGraphiQLEditor>
  );
};
