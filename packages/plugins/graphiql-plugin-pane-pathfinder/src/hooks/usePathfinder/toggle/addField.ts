import { IRange } from 'monaco-editor';
import { FieldNode, Location } from 'graphql';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// types
import { AncestorField, AncestorRoot, AncestorsArray } from '../types';

const activeEditorTab = useEditor.getState().getActiveTab();
const updateModel = useEditor.getState().updateModel;

const targetModel = 'operationsModel';

export const addField = ({
  ancestors,
  // index,
  target,
}: {
  ancestors: AncestorField[];
  target: AncestorField;
  // index: number;
  // eslint-disable-next-line consistent-return
}) => {
  const ancestorSelectionsCount = target.selectionSet?.selections.length;

  const index = ancestors.findIndex((a) => a === target);

  const previousAncestor = ancestors[index - 1];

  // 1. this is a top level field and there are no other top level selections <-- this case means that there is no operation and should be covered by NEW_OPERATION
  if (!('field' in previousAncestor) && ancestorSelectionsCount === 1) {
    return console.log(
      'SHOULD NOT SEE THIS!: this is a top level field and there are no other top level selections',
      { ancestorSelectionsCount, previousAncestor }
    );
  }

  // 2. this is a top level field and there are existing top level selections
  if (
    !(
      'field' in previousAncestor &&
      ancestorSelectionsCount &&
      ancestorSelectionsCount > 1
    )
  ) {
    console.log(
      'this is a top level field and there are existing top level selections',
      previousAncestor
    );
    const location = (previousAncestor as AncestorRoot).operationDefinition
      ?.loc as Location;

    const range: IRange = {
      startLineNumber: location.endToken.line,
      startColumn: 0,
      endLineNumber: location.endToken.line,
      endColumn: 0,
    };
    return updateModel({
      range,
      targetModel,
      text: `${' '.repeat(location.startToken.column + 1)}${target.field.name}\n`,
    });
  }

  // 3. this is not a top level field and it's parent is NOT selected
  if ('field' in previousAncestor && !previousAncestor.selection) {
    console.log(`this is not a top level field and it's parent is NOT selected`);
    // const location = previousAncestor.selection?.loc as Location;
    // const calculatedWrite = `${previousAncestor.field.name} {\n${' '.repeat(
    //   location.startToken.column + 1
    // )}${ancestor.field.name}\n${' '.repeat(location.startToken.column - 1)}}`;
    // const range: IRange = {
    //   startLineNumber: location.startToken.line,
    //   startColumn: location.startToken.column,
    //   endLineNumber: location.startToken.line,
    //   endColumn:
    //     location.startToken.column + previousAncestor.field.name.length + 2,
    // };
    // return updateModel({
    //   range,
    //   targetModel,
    //   text: calculatedWrite,
    // });
  }
  // 4. this is not a top level field, it's parent is selected, it's parent does not have any selections
  // console.log('field, is not selected, is target, setting actionMode to INSERT', {
  //   name: ancestor.field.name,
  //   index,
  //   ancestor,
  //   ancestors,
  // });

  // 1. if the previous ancestor is a field AND it doesn't have any selections, we need to calculate the range from the previous ancestor
  if (
    'field' in previousAncestor &&
    !(previousAncestor.selection as FieldNode).selectionSet
  ) {
    // const location = previousAncestor.selection?.loc as Location;
    // const calculatedWrite = `${previousAncestor.field.name} {\n${' '.repeat(
    //   location.startToken.column + 1
    // )}${ancestor.field.name}\n${' '.repeat(location.startToken.column - 1)}}`;
    // const range: IRange = {
    //   startLineNumber: location.startToken.line,
    //   startColumn: location.startToken.column,
    //   endLineNumber: location.startToken.line,
    //   endColumn:
    //     location.startToken.column + previousAncestor.field.name.length + 2,
    // };
    // return updateModel({
    //   range,
    //   targetModel,
    //   text: calculatedWrite,
    // });
  } else if ('field' in previousAncestor) {
    const location = previousAncestor.selection?.loc as Location;
    const range: IRange = {
      startLineNumber: location.endToken.line,
      startColumn: 0,
      endLineNumber: location.endToken.line,
      endColumn: 0,
    };
    return updateModel({
      range,
      targetModel,
      text: `${' '.repeat(location.startToken.column + 1)}${target.field.name}\n`,
    });
  }
};
