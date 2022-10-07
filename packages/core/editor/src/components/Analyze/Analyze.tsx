// components
import { MonacoEditor } from '../MonacoEditor';

// hooks
import { useSchema } from '@graphiql-prototype/store';

// styles
import { StyledAnalyzeWrap } from './styles';

export const Analyze = () => {
  const { isExecuting } = useSchema();

  return (
    <StyledAnalyzeWrap isExecuting={isExecuting}>
      <MonacoEditor
        monacoEditorType="results"
        optionOverrides={{
          lineNumbers: 'off',
          readOnly: true,
        }}
      />
    </StyledAnalyzeWrap>
  );
};
