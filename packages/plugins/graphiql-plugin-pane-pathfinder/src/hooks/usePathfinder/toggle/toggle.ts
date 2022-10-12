import { StoreApi } from 'zustand';
import { Location } from 'graphql';
import { IRange } from 'monaco-editor';

// helpers
import { insertNewOperation } from './insertNewOperation';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// types
import { AncestorRoot, AncestorsArray, PathfinderStore } from '../types';

// utils
import {
  FieldNode,
  //  Kind
} from 'graphql';

const targetModel = 'operationsModel';

export const toggle = ({
  get,
  ancestors,
}: {
  ancestors: AncestorsArray;
  get: StoreApi<PathfinderStore>['getState'];
}) => {
  const activeEditorTab = useEditor.getState().getActiveTab();
  const updateModel = useEditor.getState().updateModel;

  const target = ancestors[ancestors.length - 1];

  // 👇 short-circuit this whole crazy process and build a brand new operation if we don't have an active operation definition
  if (!(ancestors[0] as AncestorRoot).operationDefinition) {
    return insertNewOperation({ ancestors });
  }

  ancestors.forEach((ancestor, index) => {
    const isField = 'field' in ancestor;

    if (isField) {
      const isSelected = !!ancestor.selection;

      if (isSelected && ancestor === target) {
        // this is a REMOVE action

        const location = ancestor.selection?.loc as Location;

        const ancestorSelectionsCount = ancestor.selectionSet?.selections.length;

        const previousAncestor = ancestors[index - 1];

        // 1. this is a top level field and is the only selection
        if (!('field' in previousAncestor) && ancestorSelectionsCount === 1) {
          console.log('REMOVE: this is a top level field and is the only selection');

          const range: IRange = activeEditorTab.operationsModel.getFullModelRange();

          return updateModel({
            range,
            targetModel,
            text: null,
          });
        }

        // 2. this is a top level field but there are other top level selections
        if (
          !('field' in previousAncestor) &&
          ancestorSelectionsCount &&
          ancestorSelectionsCount > 1
        ) {
          console.log(
            'REMOVE: this is a top level field but there are other top level selections',
            location
          );

          const range: IRange = {
            startLineNumber: location.endToken.line,
            startColumn: 0,
            endLineNumber: location.endToken.line + 1,
            endColumn: 0,
          };

          return updateModel({
            range,
            targetModel,
            text: null,
          });
        }

        // 3. this is not a top level field and is the only selection
        if (ancestorSelectionsCount === 1) {
          console.log(
            'REMOVE: this is not a top level field and is the only selection',
            location
          );
          const range: IRange = {
            startLineNumber: location.startToken.prev?.line as number,
            startColumn: location.startToken.prev?.column as number,
            endLineNumber: location.endToken.next?.line as number,
            endColumn: (location.endToken.next?.column as number) + 1,
          };

          return updateModel({
            range,
            targetModel,
            text: null,
          });
        }

        // 4. this is not a top level field but there are other selections
        if (ancestorSelectionsCount && ancestorSelectionsCount > 1) {
          console.log(
            'REMOVE: this is not a top level field but there are other selections',
            location
          );
          const range: IRange = {
            startLineNumber: location.startToken.line,
            startColumn: 0,
            endLineNumber: location.startToken.line + 1,
            endColumn: 0,
          };
          return updateModel({
            range,
            targetModel,
            text: null,
          });
        }
      }

      if (!isSelected && ancestor === target) {
        // this is an INSERT action
        const ancestorSelectionsCount = ancestor.selectionSet?.selections.length;
        const previousAncestor = ancestors[index - 1];

        // 1. this is a top level field and there are no other top level selections <-- this case means that there is no operation and should be covered by NEW_OPERATION
        if (!('field' in previousAncestor) && ancestorSelectionsCount === 1) {
          return console.log(
            'SHOULD NOT SEE THIS!: this is a top level field and there are no other top level selections'
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
            'this is a top level field and there are existing top level selections'
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
            text: `${' '.repeat(location.startToken.column + 1)}${ancestor.field.name}\n`,
          });
        }

        // 3. this is not a top level field and it's parent is selected
        // 4. this is not a top level field and it's parent is NOT selected
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
            text: `${' '.repeat(location.startToken.column + 1)}${ancestor.field.name}\n`,
          });
        }
        // }
      }
    } // isField
  });
};

// if (isRootOperation) {
//   console.log('root', { index, ancestor });

//   const operationDefinition: OperationDefinitionNode = {
//     kind: Kind.OPERATION_DEFINITION,
//     name: {
//       kind: Kind.NAME,
//       value: `new${ancestor.rootTypeName}`,
//     },
//     operation: ancestor.rootTypeName,
//     selectionSet: {
//       kind: Kind.SELECTION_SET,
//       selections: [],
//     },
//   };

//   setOperationDefinition({ operationDefinition });
// }
