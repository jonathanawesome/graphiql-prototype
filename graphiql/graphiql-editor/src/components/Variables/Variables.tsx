import { useState } from 'react';

// components
import { MonacoEditor } from '../MonacoEditor';

// styles
import { VariablesEditor, VariablesWrap } from './styles';

type EditorType = 'CodeEditor' | 'InputEditor';

export const Variables = () => {
  const [editorType] = useState<EditorType>('CodeEditor');

  return (
    <VariablesWrap>
      <VariablesEditor isVisible={editorType === 'CodeEditor'}>
        <MonacoEditor editorType="variables" />
      </VariablesEditor>
    </VariablesWrap>
  );
};
