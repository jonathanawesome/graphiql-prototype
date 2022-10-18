import {
  ArgumentNode,
  FieldNode,
  InlineFragmentNode,
  Kind,
  Location,
  print,
  VariableDefinitionNode,
} from 'graphql';
import { IRange } from 'monaco-editor';

// helpers
import { insertNewOperation } from './insertNewOperation';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// types
import {
  AncestorField,
  AncestorInlineFragment,
  AncestorRoot,
  AncestorsArray,
} from '../types';

import {
  rangeInsertAfterField,
  rangeInsertBeforeClosingBracket,
  rangeRemoveForAllSelectionsOfField,
  rangeRemoveForFieldWithSelections,
  rangeRemoveForSingleLine,
} from './range';

const targetEditor = 'operations';

const getStringToWrite = ({
  ancestor,
}: {
  ancestor: AncestorField | AncestorInlineFragment;
}) => {
  if (ancestor.type === 'FIELD') {
    return ancestor.field.name;
  }
  if (ancestor.type === 'INLINE_FRAGMENT') {
    return `... on ${ancestor.onType}`;
  }
  return 'WHOOPS';
};

export const toggle = ({
  ancestors,
}: {
  ancestors: AncestorsArray;
  // eslint-disable-next-line consistent-return
}) => {
  console.log('toggle', {
    ancestors,
  });

  const activeEditorTab = useEditor.getState().getActiveTab();
  const updateModel = useEditor.getState().updateModel;

  const target = ancestors[ancestors.length - 1];
  const index = ancestors.findIndex((a) => a === target);

  const previousAncestor = ancestors[index - 1];
  const countPreviousAncestorSelections = (): number => {
    if (
      (previousAncestor.type === 'INLINE_FRAGMENT' ||
        previousAncestor.type === 'FIELD') &&
      previousAncestor.selection &&
      'selectionSet' in previousAncestor.selection &&
      previousAncestor.selection.selectionSet
    ) {
      return previousAncestor.selection.selectionSet.selections.length;
    }
    if (
      previousAncestor.type === 'ROOT' &&
      previousAncestor.operationDefinition &&
      'selectionSet' in previousAncestor.operationDefinition &&
      previousAncestor.operationDefinition.selectionSet
    ) {
      return previousAncestor.operationDefinition.selectionSet.selections.length;
    }
    return 0;
  };

  const getLocationFromAncestor = ({ index }: { index: number }) => {
    const ancestor = ancestors[index];
    console.log('ancester', { ancestor });
    if (
      (ancestor.type === 'INLINE_FRAGMENT' || ancestor.type === 'FIELD') &&
      ancestor.selection
    ) {
      return ancestor.selection.loc;
    }
    if (ancestor.type === 'ROOT' && ancestor.operationDefinition) {
      return ancestor.operationDefinition.loc;
    }
    return null;
  };

  const getLocationFromPreviousAncestor = () => {
    if (
      (previousAncestor.type === 'INLINE_FRAGMENT' ||
        previousAncestor.type === 'FIELD') &&
      previousAncestor.selection
    ) {
      return previousAncestor.selection.loc;
    }
    if (previousAncestor.type === 'ROOT' && previousAncestor.operationDefinition) {
      return previousAncestor.operationDefinition.loc;
    }
    return null;
  };

  const previousAncestorSelectionsCount = countPreviousAncestorSelections();
  const locationFromPreviousAncestor = getLocationFromPreviousAncestor();

  // 👇 short-circuit this process and build a brand new operation if we don't have an active operation definition
  if ((ancestors[0] as AncestorRoot).operationDefinition === null) {
    return insertNewOperation({ ancestors });
  }

  // if the toggled item is on an operationType that differs from the current operationType, spin up a new tab and do work there
  const currentOperationType = activeEditorTab?.operationDefinition?.operation;

  if ((ancestors[0] as AncestorRoot).operationType !== currentOperationType) {
    const initEditorTab = useEditor.getState().initEditorTab;

    initEditorTab({});

    return insertNewOperation({ ancestors });
  }

  const isNestedField =
    previousAncestor.type === 'FIELD' || previousAncestor.type === 'INLINE_FRAGMENT';
  const isField = target.type === 'FIELD';
  const isArgument = target.type === 'ARGUMENT';

  if (isArgument) {
    const argumentTargetLocation = (previousAncestor as AncestorField).selection
      ?.loc as Location;
    const variableTargetLocation = (ancestors[0] as AncestorRoot).operationDefinition
      ?.loc as Location;
    const newVariableDefinitionNode: VariableDefinitionNode = {
      kind: Kind.VARIABLE_DEFINITION,
      variable: {
        kind: Kind.VARIABLE,
        name: {
          kind: Kind.NAME,
          value: target.argument.name,
        },
      },
      type: {
        kind: Kind.NAMED_TYPE,
        name: {
          kind: Kind.NAME,
          value: target.argument.type.toString(),
        },
      },
    };
    const newArgumentNode: ArgumentNode = {
      kind: Kind.ARGUMENT,
      name: {
        kind: Kind.NAME,
        value: target.argument.name,
      },
      value: {
        kind: Kind.VARIABLE,
        name: {
          kind: Kind.NAME,
          value: target.argument.name,
        },
      },
    };
    const argumentText = `(${print(newArgumentNode)})`;
    const variableText = `(${print(newVariableDefinitionNode)})`;
    console.log('isArgument', {
      target,
      argumentTargetLocation,
      variableTargetLocation,
      printedArgument: argumentText,
      printedVariable: variableText,
    });

    return updateModel({
      edits: [
        {
          range: {
            startLineNumber: variableTargetLocation.startToken.line,
            endLineNumber: variableTargetLocation.startToken.line,
            startColumn:
              (variableTargetLocation.startToken.next?.column as number) +
              (variableTargetLocation.startToken.next?.value as string).length,
            endColumn:
              (variableTargetLocation.startToken.next?.column as number) +
              (variableTargetLocation.startToken.next?.value as string).length,
          },
          text: variableText,
        },
        {
          range: {
            startLineNumber: argumentTargetLocation.startToken.line,
            endLineNumber: argumentTargetLocation.startToken.line,
            startColumn:
              argumentTargetLocation.startToken.column +
              argumentTargetLocation.startToken.value.length,
            endColumn:
              argumentTargetLocation.startToken.column +
              argumentTargetLocation.startToken.value.length,
          },
          text: argumentText,
        },
      ],
      targetEditor,
    });
  }
  if (isField) {
    const isSelected = !!target.selection;

    if (isSelected) {
      // this is a REMOVE action

      const location = target.selection?.loc as Location;

      if (!isNestedField) {
        if (previousAncestorSelectionsCount === 1) {
          // console.log('REMOVE: this is a top level field and is the only selection', {});
          return updateModel({
            edits: [
              {
                range: activeEditorTab.operationsModel.getFullModelRange(),
                text: null,
              },
            ],
            targetEditor,
          });
        }

        if (previousAncestorSelectionsCount > 0) {
          // console.log(
          //   'REMOVE: this is a top level field but there are other top level selections'
          // );

          if (
            target.selection &&
            'selectionSet' in target.selection &&
            target.selection.selectionSet
          ) {
            // if this field has existing selections, we use an expanded range
            return updateModel({
              edits: [
                {
                  range: rangeRemoveForFieldWithSelections({ location }),
                  text: null,
                },
              ],
              targetEditor,
            });
          } else {
            // if this field does not have selections, we just remove the field
            return updateModel({
              edits: [
                {
                  range: rangeRemoveForSingleLine({ location }),
                  text: null,
                },
              ],
              targetEditor,
            });
          }
        }
      }

      if (isNestedField) {
        if (previousAncestorSelectionsCount === 1) {
          let range: IRange | null = null;
          if (previousAncestor.type === 'INLINE_FRAGMENT') {
            if (
              previousAncestor.selection &&
              (previousAncestor.selection as InlineFragmentNode).selectionSet.selections
                .length === 1
            ) {
              // the previous ancestor is an inline fragment and this field is the only selection
              // we need to determine if the previous ancestor's (an inline fragment) parent (a field) has additional inline fragment selections

              // find the index of the parent inline fragment
              const nearestSelectedInlineFragmentIndex = [...ancestors]
                .reverse()
                .findIndex((a) => a.type === 'INLINE_FRAGMENT');

              // the parent (a field) of this field's parent (an inline fragment)
              const inlineFragmentParentField = ancestors[
                nearestSelectedInlineFragmentIndex
              ] as AncestorField;

              if (
                inlineFragmentParentField.selection &&
                'selectionSet' in inlineFragmentParentField.selection &&
                inlineFragmentParentField.selection.selectionSet &&
                inlineFragmentParentField.selection.selectionSet.selections.length === 1
              ) {
                // this field's parent (an inline fragment) is the only selection
                range = rangeRemoveForAllSelectionsOfField({
                  location: locationFromPreviousAncestor as Location,
                });
              } else {
                // this field's parent (an inline fragment) is not the only selection remaining on the inlineFragmentParentField
                range = rangeRemoveForFieldWithSelections({
                  location: locationFromPreviousAncestor as Location,
                });
              }
            } else {
              // the previous ancestor is an inline fragment and this field is not the only selection
              range = rangeRemoveForAllSelectionsOfField({
                location: locationFromPreviousAncestor as Location,
              });
            }
          } else {
            // this field is the only selection of it's parent and there are no inline fragments in it's ancestry
            range = rangeRemoveForAllSelectionsOfField({ location });
          }

          console.log('REMOVE: this is not a top level field and is the only selection', {
            target,
          });
          return updateModel({
            edits: [
              {
                range,
                text: null,
              },
            ],
            targetEditor,
          });
        }

        if (previousAncestorSelectionsCount > 1) {
          console.log(
            'REMOVE: this is not a top level field but there are other selections'
          );
          if ((target.selection as FieldNode | InlineFragmentNode).selectionSet) {
            // if this field has existing selections, we use an expanded range
            return updateModel({
              edits: [
                {
                  range: rangeRemoveForFieldWithSelections({ location }),
                  text: null,
                },
              ],
              targetEditor,
            });
          } else {
            // if this field does not have selections, we just remove the field
            return updateModel({
              edits: [
                {
                  range: rangeRemoveForSingleLine({ location }),
                  text: null,
                },
              ],
              targetEditor,
            });
          }
        }
      }
    }

    if (!isSelected) {
      // this is an INSERT action
      if (!isNestedField && previousAncestorSelectionsCount > 0) {
        const location = locationFromPreviousAncestor as Location;

        console.log(
          'INSERT: this is a top level field and there are existing top level selections',
          { location, previousAncestor }
        );

        return updateModel({
          edits: [
            {
              range: rangeInsertBeforeClosingBracket({ location }),
              text: `${' '.repeat(location.startToken.column + 1)}${target.field.name}\n`,
            },
          ],
          targetEditor,
        });
      }

      if (isNestedField && previousAncestor.selection) {
        console.log(`INSERT: this is not a top level field and it's parent is selected`);

        const location = locationFromPreviousAncestor as Location;

        // if the parent has more than one selection, our range is one thing
        if (previousAncestorSelectionsCount > 0) {
          return updateModel({
            edits: [
              {
                range: rangeInsertBeforeClosingBracket({ location }),
                text: `${' '.repeat(location.startToken.column + 1)}${
                  target.field.name
                }\n`,
              },
            ],
            targetEditor,
          });
        } else {
          // if the parent does not have any selections, our range is another
          const stringToWrite = getStringToWrite({
            ancestor: previousAncestor,
          });

          const calculatedWrite = `${stringToWrite} {\n${' '.repeat(
            location.startToken.column + 1
          )}${target.field.name}\n${' '.repeat(location.startToken.column - 1)}}`;

          return updateModel({
            edits: [
              {
                range: rangeInsertAfterField({
                  endColumn: location.startToken.column + stringToWrite.length + 2,
                  location,
                }),
                text: calculatedWrite,
              },
            ],
            targetEditor,
          });
        }
      }

      // this is the most complicated case to reckon...reader beware ☠️
      // our target is a nested field and the previous ancestor is not selected
      if (isNestedField && !previousAncestor.selection) {
        // console.log(
        //   'field, is not selected, is target, setting actionMode to INSERT --- CHALLENGE'
        // );

        // capture all ancestors except the first, which is always the root operation type
        const fieldAncestors = [...ancestors.slice(1)] as Array<
          AncestorField | AncestorInlineFragment
        >;

        // from those ancestors, capture all that are not selected
        // we'll use this array to build our new selection
        const allUnselectedAncestors = fieldAncestors.filter((a) => !a.selection);

        // capture the nearest ancestor that is selected
        // used for location/range and determining if our new selection should be wrapped in brackets
        const nearestSelectedAncestor = [...fieldAncestors]
          .reverse()
          .find((a) => a.selection);

        // a boolean indicating whether our nearest selected ancestor has selections of it's own
        // also used for location/range and determining if our new selection should be wrapped in brackets
        const nearestSelectedAncestorHasSelections = !!(
          nearestSelectedAncestor?.selection &&
          'selectionSet' in nearestSelectedAncestor?.selection &&
          nearestSelectedAncestor?.selection.selectionSet
        );

        // the location of our insert action is either the nearest selected ancestor or the root operation type
        const location = nearestSelectedAncestor
          ? (nearestSelectedAncestor.selection?.loc as Location)
          : ((ancestors[0] as AncestorRoot).operationDefinition?.loc as Location);

        const calculatedText = () => {
          const arr = allUnselectedAncestors;
          const indentSize = 2;

          // if we have a nearest selected ancestor (meaning we're adding to a selected field, not to the root operation)
          // and that ancestor does not have selections, we should add wrapping brackets
          const shouldAddWrappingBrackets =
            !!nearestSelectedAncestor && !nearestSelectedAncestorHasSelections;

          let fieldText = '';
          let bracketText = '';

          if (shouldAddWrappingBrackets) {
            fieldText += ` {\n`;
          }

          // a variable to hold the count of the number of spaces to indent each of our fields
          // we increment this for every field
          let fieldIndentCount = (ancestors.length - arr.length) * indentSize;

          // a variable to hold the count of the number of spaces to indent the closing brackets on each of our fields (where necessary)
          // we decrement this for every field/bracket
          let bracketIndentCount = (ancestors.length - 2) * indentSize;

          arr.forEach((a, index) => {
            const fieldIndent = ' '.repeat(fieldIndentCount);
            fieldText += fieldIndent;
            fieldText += getStringToWrite({ ancestor: a });
            // this space is critical, so i'm calling it out here
            fieldText += ' ';
            fieldText += `${index < arr.length - 1 ? '{\n' : '\n'}`;
            fieldIndentCount += 2;

            const bracketIndent = `${' '.repeat(bracketIndentCount)}}\n`;
            bracketText += `${index < arr.length - 1 ? bracketIndent : ''}`;
            bracketIndentCount -= 2;
          });

          if (shouldAddWrappingBrackets) {
            bracketText += `${' '.repeat(bracketIndentCount + 2)}}`;
          }
          const text = fieldText + bracketText;

          return text;
        };

        let range: IRange | null = null;

        if (!nearestSelectedAncestor) {
          range = rangeInsertBeforeClosingBracket({ location });
        } else {
          if (nearestSelectedAncestorHasSelections) {
            range = rangeInsertBeforeClosingBracket({ location });
          } else {
            const stringToWrite = getStringToWrite({ ancestor: nearestSelectedAncestor });
            range = {
              startLineNumber: location.startToken.line,
              startColumn: (location.startToken.column + stringToWrite.length) as number,
              endLineNumber: location.startToken.line,
              endColumn:
                ((location.startToken.column + stringToWrite.length) as number) + 1,
            };
          }
        }

        return updateModel({
          edits: [
            {
              range,
              text: calculatedText(),
            },
          ],
          targetEditor,
        });
      }
    }
  } // isField
};
