// components
import { MonacoEditor } from '../MonacoEditor';

// hooks
import { useSchema } from '@graphiql-prototype/store';

// styles
import { StyledAnalyzeWrap } from './styles';

export const Analyze = () => {
  const { isExecuting } = useSchema();

  return (
    <div className={StyledAnalyzeWrap({ isExecuting })}>
      <MonacoEditor
        monacoEditorType="results"
        optionOverrides={{
          lineNumbers: 'off',
          readOnly: true,
        }}
      />
    </div>
  );
};
