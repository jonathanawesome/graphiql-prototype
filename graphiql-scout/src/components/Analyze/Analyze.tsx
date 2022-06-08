import { editor } from 'monaco-editor';

/** components */
import { Editor } from '../Editor';

/** styles */
import { AnalyzeWrap } from './styles';

export const Analyze = ({ resultsModel }: { resultsModel: editor.ITextModel }) => {
  return (
    <AnalyzeWrap>
      <Editor
        editorType="results"
        initWithModel={resultsModel}
        optionOverrides={{
          lineNumbers: 'off',
          readOnly: true,
        }}
      />
    </AnalyzeWrap>
  );
};
