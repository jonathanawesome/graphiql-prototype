// components
import { MonacoEditor } from '../MonacoEditor';

// styles
import { AnalyzeWrap } from './styles';

export const Analyze = () => {
  return (
    <AnalyzeWrap>
      <MonacoEditor
        monacoEditorType="results"
        optionOverrides={{
          lineNumbers: 'off',
          readOnly: true,
        }}
      />
    </AnalyzeWrap>
  );
};
