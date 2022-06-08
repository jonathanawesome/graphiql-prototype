import { editor as MONACO_EDITOR } from 'monaco-editor';

/** components */
import { MonacoEditor } from '../MonacoEditor';

/** styles */
import { AnalyzeWrap } from './styles';

export const Analyze = ({ resultsModel }: { resultsModel: MONACO_EDITOR.ITextModel }) => {
  return (
    <AnalyzeWrap>
      <MonacoEditor
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
