import { useState } from 'react';
import { editor as MONACO_EDITOR } from 'monaco-editor';

/** components */
import { EasyVars } from '@graphiql-v2-prototype/graphiql-plugin-operations-tools-easy-vars';
import {
  Code,
  Input,
  OptionItem,
  ToggleGroup,
} from '@graphiql-v2-prototype/graphiql-ui-library';
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

export const Variables = ({
  variablesModel,
}: {
  variablesModel: MONACO_EDITOR.ITextModel;
}) => {
  const [editorType, setEditorTtype] = useState<EditorType>('CodeEditor');

  const activeEditorTab = getActiveEditorTab();

  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;

  return (
    <VariablesWrap>
      <VariablesEditor isVisible={editorType === 'CodeEditor'}>
        <MonacoEditor editorType="variables" initWithModel={variablesModel} />
      </VariablesEditor>

      {variableDefinitions &&
        variableDefinitions.length > 0 &&
        editorType === 'InputEditor' && (
          <EasyVarsWrap>
            <EasyVars
              variableDefinitions={[...variableDefinitions]}
              variables={activeEditorTab?.variables}
            />
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
