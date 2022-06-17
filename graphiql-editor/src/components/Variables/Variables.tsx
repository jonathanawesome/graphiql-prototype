import { useState } from 'react';

/** components */
import {
  Code,
  Input,
  OptionItem,
  ToggleGroup,
} from '@graphiql-v2-prototype/graphiql-ui-library';
import { EasyVars } from '@graphiql-v2-prototype/graphiql-plugin-operations-tools-easy-vars';
import { MonacoEditor } from '../MonacoEditor';

/** styles */
import {
  EasyVarsWrap,
  EditorOptionWrap,
  Note,
  VariablesEditor,
  VariablesWrap,
} from './styles';

/** utils */
import { getActiveEditorTab } from '../../utils';

type EditorType = 'CodeEditor' | 'InputEditor';

export const Variables = () => {
  const [editorType, setEditorTtype] = useState<EditorType>('CodeEditor');

  const activeEditorTab = getActiveEditorTab();

  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;

  return (
    <VariablesWrap>
      <VariablesEditor isVisible={editorType === 'CodeEditor'}>
        <MonacoEditor editorType="variables" />
      </VariablesEditor>

      {variableDefinitions &&
        variableDefinitions.length > 0 &&
        editorType === 'InputEditor' && (
          <EasyVarsWrap>
            <EasyVars variableDefinitions={[...variableDefinitions]} />
          </EasyVarsWrap>
        )}

      {editorType === 'InputEditor' &&
        ((variableDefinitions && variableDefinitions?.length === 0) ||
          !variableDefinitions) && <Note>There are no active variable definitions.</Note>}

      <EditorOptionWrap>
        <OptionItem
          title="Select an editor type"
          control={
            <ToggleGroup
              ariaLabel="Enable or disable EasyVars"
              defaultValue={`InputEditor`}
              items={[
                {
                  ariaLabel: 'Use input editor',
                  value: 'InputEditor',
                  icon: <Input />,
                },
                { ariaLabel: 'Use code editor', value: 'CodeEditor', icon: <Code /> },
              ]}
              onChange={(value) => setEditorTtype(value as EditorType)}
              size="mini"
              value={editorType}
            />
          }
        />
      </EditorOptionWrap>
    </VariablesWrap>
  );
};
