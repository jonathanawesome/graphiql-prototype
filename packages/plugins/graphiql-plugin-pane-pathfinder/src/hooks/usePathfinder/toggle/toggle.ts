import { StoreApi } from 'zustand';
import { Kind, Location, print, SelectionNode } from 'graphql';
import { IRange } from 'monaco-editor';

// helpers
import { insertNewOperation } from './insertNewOperation';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// types
import { AncestorField, AncestorRoot, AncestorsArray, PathfinderStore } from '../types';

// utils
import {
  FieldNode,
  //  Kind
} from 'graphql';
import {
  rangeInsertBeforeClosingBracket,
  rangeRemoveForAllSelectionsOfField,
  rangeRemoveForFieldWithSelections,
  rangeRemoveForSingleLine,
} from './range';

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
  const index = ancestors.findIndex((a) => a === target);

  // const ancestorSelectionsCount = target.selectionSet?.selections.length;

  const previousAncestor = ancestors[index - 1];
  const countPreviousAncestorSelections = (): number => {
    if (
      'field' in previousAncestor &&
      previousAncestor.selection &&
      'selectionSet' in previousAncestor.selection &&
      previousAncestor.selection.selectionSet
    ) {
      return previousAncestor.selection.selectionSet.selections.length;
    }
    if (
      'operationType' in previousAncestor &&
      previousAncestor.operationDefinition &&
      'selectionSet' in previousAncestor.operationDefinition &&
      previousAncestor.operationDefinition.selectionSet
    ) {
      return previousAncestor.operationDefinition.selectionSet.selections.length;
    }
    return 0;
  };

  const previousAncestorSelectionsCount = countPreviousAncestorSelections();

  console.log('toggle', {
    ancestors,
    rootIsFirst: 'operationType' in ancestors[0],
    previousAncestor,
    // ancestorSelectionsCount,
    previousAncestorSelectionsCount,
  });

  // 👇 short-circuit this process and build a brand new operation if we don't have an active operation definition
  if ((ancestors[0] as AncestorRoot).operationDefinition === null) {
    return insertNewOperation({ ancestors });
  }

  const isNestedField = 'field' in previousAncestor;
  const isField = 'field' in target;

  if (isField) {
    const isSelected = !!target.selection;

    if (isSelected) {
      // this is a REMOVE action

      const location = target.selection?.loc as Location;

      if (!isNestedField) {
        // 1. this is a top level field and is the only selection
        if (previousAncestorSelectionsCount === 1) {
          console.log('REMOVE: this is a top level field and is the only selection', {});

          // * WORKING!
          return updateModel({
            range: activeEditorTab.operationsModel.getFullModelRange(),
            targetModel,
            text: null,
          });
        }

        // 2. this is a top level field but there are other top level selections
        if (previousAncestorSelectionsCount > 0) {
          console.log(
            'REMOVE: this is a top level field but there are other top level selections',
            {
              location,
              target,
            }
          );

          // does this field have selections?
          if (
            target.selection &&
            'selectionSet' in target.selection &&
            target.selection.selectionSet
          ) {
            // range has to be the entire selection here
            // * WORKING
            return updateModel({
              range: rangeRemoveForFieldWithSelections({ location }),
              targetModel,
              text: null,
            });
          } else {
            // * WORKING
            return updateModel({
              range: rangeRemoveForSingleLine({ location }),
              targetModel,
              text: null,
            });
          }
        }
      }

      if (isNestedField) {
        // 3. this is not a top level field and is the only selection
        if (previousAncestorSelectionsCount === 1) {
          console.log(
            'REMOVE: this is not a top level field and is the only selection',
            location
          );
          // * WORKING
          return updateModel({
            range: rangeRemoveForAllSelectionsOfField({ location }),
            targetModel,
            text: null,
          });
        }

        // 4. this is not a top level field but there are other selections
        if (previousAncestorSelectionsCount > 1) {
          console.log(
            'REMOVE: this is not a top level field but there are other selections',
            { location }
          );
          if ((target.selection as FieldNode).selectionSet) {
            // this target has selections, we need to remove all of them
            return updateModel({
              range: rangeRemoveForFieldWithSelections({ location }),
              targetModel,
              text: null,
            });
          } else {
            return updateModel({
              range: rangeRemoveForSingleLine({ location }),
              targetModel,
              text: null,
            });
          }
        }
      }
    }

    if (!isSelected) {
      // this is an INSERT action
      // const ancestorSelectionsCount = target.selectionSet?.selections.length;
      // const previousAncestor = ancestors[index - 1];

      // 1. this is a top level field and there are no other top level selections <-- this case means that there is no operation and should be covered by NEW_OPERATION
      // if (!('field' in previousAncestor) && ancestorSelectionsCount === 1) {
      //   return console.log(
      //     'SHOULD NOT SEE THIS!: this is a top level field and there are no other top level selections'
      //   );
      // }

      // 2. this is a top level field and there are existing top level selections
      if (!isNestedField && previousAncestorSelectionsCount > 0) {
        console.log(
          'INSERT: this is a top level field and there are existing top level selections',
          { previousAncestor }
        );
        const location = (previousAncestor as AncestorRoot).operationDefinition
          ?.loc as Location;

        // * WORKING!
        return updateModel({
          range: rangeInsertBeforeClosingBracket({ location }),
          targetModel,
          text: `${' '.repeat(location.startToken.column + 1)}${target.field.name}\n`,
        });
      }

      // 3. this is not a top level field and it's parent is selected
      if (isNestedField && previousAncestor.selection) {
        const location = previousAncestor.selection.loc as Location;
        console.log(`INSERT: this is not a top level field and it's parent is selected`, {
          previousAncestor,
          location,
          previousAncestorSelectionsCount,
        });

        // if the parent has more than one selection, our range is one thing
        if (previousAncestorSelectionsCount > 0) {
          // * WORKING!
          return updateModel({
            range: rangeInsertBeforeClosingBracket({ location }),
            targetModel,
            text: `${' '.repeat(location.startToken.column + 1)}${target.field.name}\n`,
          });
        } else {
          // if the parent does not have any selections, our range is another
          const calculatedWrite = `${previousAncestor.field.name} {\n${' '.repeat(
            location.startToken.column + 1
          )}${target.field.name}\n${' '.repeat(location.startToken.column - 1)}}`;
          const range: IRange = {
            startLineNumber: location.startToken.line,
            startColumn: location.startToken.column,
            endLineNumber: location.startToken.line,
            endColumn:
              location.startToken.column + previousAncestor.field.name.length + 2,
          };
          // * WORKING!

          return updateModel({
            range,
            targetModel,
            text: calculatedWrite,
          });
        }
      }
      // 4. this is not a top level field and it's parent is NOT selected
      if (isNestedField && !previousAncestor.selection) {
        console.log(
          'field, is not selected, is target, setting actionMode to INSERT --- CHALLENGE',
          {
            name: target.field.name,
          }
        );

        // capture all ancestors except the first, which is always the root operation type
        const fieldAncestors = [...ancestors.slice(1)] as AncestorField[];

        // from those ancestors, capture all that are not selected
        const allUnselectedAncestors = fieldAncestors.filter((a) => !a.selection);

        const nearestSelectedAncestor = [...fieldAncestors]
          .reverse()
          .find((a) => a.selection);

        const nearestSelectedAncestorHasSelections = !!(
          nearestSelectedAncestor?.selection &&
          'selectionSet' in nearestSelectedAncestor?.selection &&
          nearestSelectedAncestor?.selection.selectionSet
        );

        // const nearestSelectedAncestorHasSelections = () => {
        //   if (
        //     nearestSelectedAncestor?.selection &&
        //     'selectionSet' in nearestSelectedAncestor?.selection &&
        //     nearestSelectedAncestor?.selection.selectionSet
        //   ) {
        //     return true;
        //   }
        //   return false;
        // };

        const targetLocation = () => {
          let location: Location | null = null;
          if (nearestSelectedAncestor) {
            console.log('assigning location to nearest field ancestor', {
              nearestSelectedAncestor,
            });
            location = nearestSelectedAncestor.selection?.loc as Location;
          } else {
            console.log('assigning location to operation', {
              nearestSelectedAncestor,
            });

            location = (ancestors[0] as AncestorRoot).operationDefinition
              ?.loc as Location;
          }
          return location;
        };
        const location = targetLocation();

        const calculatedText = () => {
          const shouldAddWrappingBrackets =
            // we _have_ a nearest selected ancestor (meaning we're adding to a selected field, not to the root operation)
            // also, that ancestor does not have selections
            // so we should add wrapping brackets
            !!nearestSelectedAncestor && !nearestSelectedAncestorHasSelections;
          let text = '';
          if (shouldAddWrappingBrackets) {
            text += ` {\n`;
          }
          const tabSize = 2;

          let fieldIndentCount =
            (ancestors.length - allUnselectedAncestors.length) * tabSize;
          let bracketIndentCount = (ancestors.length - 2) * tabSize;

          allUnselectedAncestors.forEach((a, index) => {
            const fieldIndent = ' '.repeat(fieldIndentCount);
            text += `${fieldIndent}`;
            text += `${a.field.name}`;
            text += ` `;
            text += `${index < allUnselectedAncestors.length - 1 ? `{\n` : '\n'}`;
            fieldIndentCount += 2;
          });
          allUnselectedAncestors.forEach((_a, index) => {
            const bracketIndent = `${' '.repeat(bracketIndentCount)}}\n`;
            text += `${index < allUnselectedAncestors.length - 1 ? bracketIndent : ''}`;
            bracketIndentCount -= 2;
          });

          if (shouldAddWrappingBrackets) {
            text += `${' '.repeat(bracketIndentCount + 2)}}`;
          }
          return text;
        };

        const text = calculatedText();

        let range: IRange | null = null;

        if (!nearestSelectedAncestor) {
          // nearestSelectedAncestor is undefined, which means we're toggling a nested field for which the top level field is not selected
          // this also means that there is already one or more top level fields that are selected
          range = {
            startLineNumber: location.endToken.line,
            startColumn: location.startToken.column,
            endLineNumber: location.endToken.line,
            endColumn: location.startToken.column,
          };
        } else {
          // two cases here
          // the nearest ancestor has existing selections
          if (nearestSelectedAncestorHasSelections) {
            range = rangeInsertBeforeClosingBracket({ location });
          } else {
            // the nearest ancestor does not have any selections
            range = {
              startLineNumber: location.startToken.line,
              startColumn: (location.startToken.column +
                nearestSelectedAncestor?.field.name.length) as number,
              endLineNumber: location.startToken.line,
              endColumn:
                ((location.startToken.column +
                  nearestSelectedAncestor?.field.name.length) as number) + 1,
            };
          }
        }

        return updateModel({
          range,
          targetModel,
          text,
        });
      }
    }
  } // isField
};
