import { OperationDefinitionNode } from 'graphql';

// constants
import { TARGET_EDITOR } from '../../constants';

// hooks
import { useEditor } from '@graphiql-prototype/store';

import { AncestorArgument, AncestorField, AncestorRoot } from '../../types';
import { EditorEdit } from '@graphiql-prototype/store/src/hooks/useEditor/types';

// utils
import {
  // findNextTokenKindInLocation,
  getSelectedArgumentsCount,
  getVariableDefinitionsCount,
  // getRangeFromStringInActiveDefinition,
  getRemoveRangeForArgumentOrVariable,
  getRemoveRangeForLastVariableDefinition,
  getRemoveRangeForLastArgument,
  getRemoveRangeNew,
  // hasSiblingArguments as hasSiblingArgumentsFunc,
  // isExistingVariableDefinitions as isExistingVariableDefinitionsFunc,
} from '../../utils';
import { IRange } from 'monaco-editor';

export const handleRemoveArgument = ({
  argumentText,
  previousAncestor,
  rootAncestor,
  target,
  variableText,
}: {
  argumentText: string;
  previousAncestor: AncestorField;
  rootAncestor: AncestorRoot;
  target: AncestorArgument;
  variableText: string;
}) => {
  const pushEdit = useEditor.getState().pushEdit;

  const position = useEditor.getState().monacoEditors['operations']?.getPosition() || {
    column: 1,
    lineNumber: 1,
  };

  const selectedArgumentsCount = getSelectedArgumentsCount({ previousAncestor });
  const variableDefinitionsCount = getVariableDefinitionsCount();

  console.log('handleRemoveArgument', {
    selectedArgumentsCount,
    variableDefinitionsCount,
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
    range: argumentRange,
    text: null,
  };
  console.log('REMOVE_ARGUMENT', { edits: [variableEdit, argumentEdit] });

  pushEdit({
    edits: [variableEdit, argumentEdit],
    position,
    targetEditor: TARGET_EDITOR,
  });

  return useEditor.getState().setDocumentState();

  // if (selectedArgumentsCount === 1 && variableDefinitionsCount === 1) {
  //   // const variableRange = getRemoveRangeForLastVariableDefinition({
  //   //   operationDefinition: rootAncestor.operationDefinition as OperationDefinitionNode,
  //   //   target,
  //   // });
  //   const variableRange = getRemoveRangeForArgumentOrVariable({
  //     text: variableText,
  //   });

  //   const argumentRange = getRemoveRangeForLastArgument({ target });

  //   console.log(
  //     '1 - REMOVE_ARGUMENT: selectedArgumentsCount === 1 && variableDefinitionsCount === 1',
  //     {
  //       variableRange,
  //       argumentRange,
  //     }
  //   );

  //   const variableEdit: EditorEdit = {
  //     range: variableRange,
  //     text: null,
  //   };

  //   const argumentEdit: EditorEdit = {
  //     range: argumentRange,
  //     text: null,
  //   };

  //   pushEdit({
  //     edits: [variableEdit, argumentEdit],
  //     position,
  //     targetEditor: TARGET_EDITOR,
  //   });
  //   return useEditor.getState().setDocumentState();
  // }

  // if (selectedArgumentsCount === 1 && variableDefinitionsCount > 1) {
  //   // const variableRange = getRemoveRangeForArgumentOrVariable({
  //   //   text: variableText,
  //   // });

  //   // const argumentRange = getRemoveRangeForLastArgument({ target });

  //   const variableRange = getRemoveRangeNew({
  //     mode: 'VARIABLE_DEFINITION',
  //     target,
  //     text: variableText,
  //   });

  //   const argumentRange = getRemoveRangeNew({
  //     mode: 'ARGUMENT',
  //     target,
  //     text: argumentText,
  //   });

  //   console.log(
  //     '2 - REMOVE_ARGUMENT: selectedArgumentsCount === 1 && variableDefinitionsCount > 1',
  //     {}
  //   );

  //   const variableEdit: EditorEdit = {
  //     range: variableRange as IRange,
  //     text: null,
  //   };

  //   const argumentEdit: EditorEdit = {
  //     range: argumentRange,
  //     text: null,
  //   };

  //   pushEdit({
  //     edits: [variableEdit, argumentEdit],
  //     position,
  //     targetEditor: TARGET_EDITOR,
  //   });
  //   return useEditor.getState().setDocumentState();
  // }

  // if (selectedArgumentsCount > 1 && variableDefinitionsCount > 1) {
  //   // const variableRange = getRemoveRangeForArgumentOrVariable({
  //   //   text: variableText,
  //   // });

  //   // const argumentRange = getRemoveRangeForArgumentOrVariable({
  //   //   text: argumentText,
  //   // });

  //   const variableRange = getRemoveRangeNew({
  //     mode: 'VARIABLE_DEFINITION',
  //     target,
  //     text: variableText,
  //   });

  //   const argumentRange = getRemoveRangeNew({
  //     mode: 'ARGUMENT',
  //     target,
  //     text: argumentText,
  //   });

  //   console.log(
  //     '3 - REMOVE_ARGUMENT: selectedArgumentsCount > 1 && variableDefinitionsCount > 1',
  //     {
  //       // argumentR: getRemoveRangeNew({ mode: 'ARGUMENT', target }),
  //       // variableR: getRemoveRangeNew({ mode: 'VARIABLE_DEFINITION', target }),
  //       // target, variableRange, argumentRange
  //     }
  //   );

  //   const variableEdit: EditorEdit = {
  //     range: variableRange as IRange,
  //     text: null,
  //   };

  //   const argumentEdit: EditorEdit = {
  //     range: argumentRange as IRange,
  //     // range: { ...(argumentRange as IRange), endColumn: 1000 },
  //     // range: {
  //     //   endColumn: 0,
  //     //   startColumn: 0,
  //     // },
  //     text: null,
  //   };

  //   pushEdit({
  //     edits: [variableEdit, argumentEdit],
  //     position,
  //     targetEditor: TARGET_EDITOR,
  //   });
  //   return useEditor.getState().setDocumentState();
  // }

  // return console.log('unhandled removeArgument...why are we here?');
};
