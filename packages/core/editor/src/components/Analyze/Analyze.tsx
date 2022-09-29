// components
import { useSchema } from '@graphiql-prototype/use-schema';
import { MonacoEditor } from '../MonacoEditor';

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
