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
    <section className={StyledGraphiQLEditor()}>
      <div className={StyledGraphiQLEditorInner({ activePane })}>
        <TopBar />
        <div className={StyledEditorWrap({ isActive: activePane === 'EDITOR' })}>
          <Editor />
        </div>
        <div className={StyledSchemaWrap({ isActive: activePane === 'SCHEMA' })}>
          <Schema />
        </div>
      </div>
    </section>
  );
};
