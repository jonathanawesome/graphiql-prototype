// constants
import { TARGET_EDITOR } from '../../constants';

// hooks
import { EditorEdit, useEditor } from '@graphiql-prototype/store';

// types
import { AncestorArgument } from '../../types';

// utils
import {
  // getSelectedArgumentsCount,
  // getVariableDefinitionsCount,
  // getRangeFromStringInActiveDefinition,
  // getRemoveRangeForArgumentOrVariable,
  // getRemoveRangeForLastVariableDefinition,
  // getRemoveRangeForLastArgument,
  getRemoveRangeNew,
  // hasSiblingArguments as hasSiblingArgumentsFunc,
  // isExistingVariableDefinitions as isExistingVariableDefinitionsFunc,
} from '../../utils';
import { IRange } from 'monaco-editor';

export const handleRemoveArgument = ({
  argumentText,
  // previousAncestor,
  target,
  variableText,
}: {
  argumentText: string;
  // previousAncestor: AncestorField;
  target: AncestorArgument;
  variableText: string;
}) => {
  const pushEdit = useEditor.getState().pushEdit;

  const position = useEditor.getState().monacoEditors['operations']?.getPosition() || {
    column: 1,
    lineNumber: 1,
  };

  console.log('handleRemoveArgument', {
    // selectedArgumentsCount,
    // variableDefinitionsCount,
  });

  const variableRange = getRemoveRangeNew({
    mode: 'VARIABLE_DEFINITION',
    target,
    text: variableText,
  });

  const argumentRange = getRemoveRangeNew({
    mode: 'ARGUMENT',
    target,
    text: argumentText,
  });

  const variableEdit: EditorEdit = {
    range: variableRange as IRange,
    text: null,
  };

  const argumentEdit: EditorEdit = {
    range: argumentRange as IRange,
    text: null,
  };

  pushEdit({
    edits: [variableEdit, argumentEdit],
    position,
    targetEditor: TARGET_EDITOR,
  });

  return useEditor.getState().setDocumentState();
};
