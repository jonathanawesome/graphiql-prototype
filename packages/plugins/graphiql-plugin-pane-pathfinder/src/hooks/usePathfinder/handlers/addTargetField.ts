import { Location } from 'graphql';
import { IPosition, IRange } from 'monaco-editor';

// constants
import { INDENT_SIZE, TARGET_EDITOR } from '../constants';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// types
import {
  AncestorArgument,
  AncestorField,
  AncestorInlineFragment,
  AncestorRoot,
  AncestorsArray,
  AncestorTypes,
} from '../types';

// utils
import {
  getLocationFromAncestor,
  getAncestorText,
  hasSiblingSelections as hasSiblingSelectionsFunc,
  getAddRangeForFieldFromLocation,
  getPositionAtEndOfLocation,
  insertNewOperation,
} from '../utils';

export const addTargetField = ({
  ancestors,
  previousAncestor,
  rootAncestor,
  target,
}: {
  ancestors: AncestorsArray;
  previousAncestor: Exclude<AncestorTypes, AncestorArgument>;
  rootAncestor: AncestorRoot;
  target: AncestorField;
}) => {
  const pushEdit = useEditor.getState().pushEdit;

  const documentDefinitions = useEditor.getState().documentDefinitions;

  const hasSiblingSelections = hasSiblingSelectionsFunc({
    mode: 'ADD',
    previousAncestor,
  });

  const previousAncestorLocation = getLocationFromAncestor({
    ancestor: previousAncestor,
  }) as Location;

  const isRootField = previousAncestor.type === 'ROOT';

  const previousAncestorIsSelected = !isRootField && previousAncestor.selection;

  // console.log('addTargetField', { hasSiblingSelections });

  if (isRootField && !hasSiblingSelections && documentDefinitions === 0) {
    console.log('ADD: isRootField && !hasSiblingSelections', {});
    return insertNewOperation({ ancestors });
  }

  if (!isRootField && !hasSiblingSelections && documentDefinitions === 0) {
    console.log('ADD: !isRootField && !hasSiblingSelections', {});
    return insertNewOperation({ ancestors });
  }

  if (isRootField && hasSiblingSelections) {
    const range = getAddRangeForFieldFromLocation({
      hasSelections: true,
      location: previousAncestorLocation,
    });

    const text = `${' '.repeat(
      previousAncestorLocation.startToken.column * INDENT_SIZE
    )}${target.field.name}\n`;

    const position = getPositionAtEndOfLocation({
      location: previousAncestorLocation,
      newTextLength: text.length,
    });

    console.log('ADD: isRootField && hasSiblingSelections', {
      location,
      // start
      // query newIsTestQuery {
      //   isTest <-- hasSiblingSelections
      // }

      // end
      // query newIsTestQuery {
      //   isTest
      //   person <-- toggling here
      // }
    });

    return pushEdit({
      edits: [{ range, text }],
      position,
      targetEditor: TARGET_EDITOR,
    });
  }

  if (!isRootField && previousAncestorIsSelected && !hasSiblingSelections) {
    const range = getAddRangeForFieldFromLocation({
      hasSelections: false,
      location: previousAncestorLocation,
    });

    const text = ` {\n${' '.repeat(previousAncestorLocation.startToken.column + 1)}${
      target.field.name
    }\n${' '.repeat(previousAncestorLocation.startToken.column - 1)}}`;

    const position = getPositionAtEndOfLocation({
      location: previousAncestorLocation,
      newTextLength: text.length,
    });

    console.log(
      'ADD: !isRootField && previousAncestorIsSelected && !hasSiblingSelections',
      {
        text,
        location,
        position,
      }
      // start
      // query newIsTestQuery {
      //   isTest
      //   person <--previousAncestorIsSelected with no selections
      // }

      // end
      // query newIsTestQuery {
      //   isTest
      //   person {
      //     name <--toggling here
      //   }
      // }
    );

    return pushEdit({
      edits: [{ range, text }],
      position,
      targetEditor: TARGET_EDITOR,
    });
  }

  if (!isRootField && previousAncestorIsSelected && hasSiblingSelections) {
    const range = getAddRangeForFieldFromLocation({
      hasSelections: true,
      location: previousAncestorLocation,
    });

    const text = `${' '.repeat(previousAncestorLocation.startToken.column + 1)}${
      target.field.name
    }\n`;

    const position = getPositionAtEndOfLocation({
      location: previousAncestorLocation,
      newTextLength: text.length,
    });

    console.log(
      'ADD: !isRootField && previousAncestorIsSelected && hasSiblingSelections',
      { location, position }
      // start
      // query newIsTestQuery {
      //   isTest
      //   person { <-- previousAncestorIsSelected
      //     name <-- hasSiblingSelections
      //   }
      // }

      // end
      // query newIsTestQuery {
      //   isTest
      //   person {
      //     name
      //     age <--toggling here
      //   }
      // }
    );

    return pushEdit({
      edits: [{ range, text }],
      position,
      targetEditor: TARGET_EDITOR,
    });
  }

  // this is the most complicated case to reckon...reader beware ☠️
  // our target is a nested field and the previous ancestor is not selected
  if (!isRootField && !previousAncestorIsSelected) {
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
      : (rootAncestor.operationDefinition?.loc as Location);

    let position: IPosition = {
      column: allUnselectedAncestors.length * INDENT_SIZE + 1 + target.field.name.length,
      lineNumber: location.endToken.line + allUnselectedAncestors.length - 1,
    };

    const generateText = () => {
      const arr = allUnselectedAncestors;

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
      let fieldIndentCount = (ancestors.length - arr.length) * INDENT_SIZE;

      // a variable to hold the count of the number of spaces to indent the closing brackets on each of our fields (where necessary)
      // we decrement this for every field/bracket
      let bracketIndentCount = (ancestors.length - 2) * INDENT_SIZE;

      arr.forEach((a, index) => {
        const fieldIndent = ' '.repeat(fieldIndentCount);
        fieldText += fieldIndent;
        fieldText += getAncestorText({ ancestor: a });
        // this space is critical
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
      position = {
        lineNumber: location.endToken.line + allUnselectedAncestors.length - 1,
        column:
          allUnselectedAncestors.length * INDENT_SIZE + 1 + target.field.name.length,
      };
      range = getAddRangeForFieldFromLocation({
        hasSelections: true,
        location,
      });
      console.log(
        'ADD: !isRootField && !previousAncestorIsSelected - 1 - (!nearestSelectedAncestor)',
        {
          location,
          position,
          // start
          // query newIsTestQuery {
          //   isTest
          // }

          // end
          // query newIsTestQuery {
          //   isTest
          //   person {
          //     name <--toggling here or _any_ child field of root field "parent"
          //   }
          // }
        }
      );
    } else {
      if (nearestSelectedAncestorHasSelections) {
        position = {
          lineNumber: location.endToken.line + allUnselectedAncestors.length - 1,
          column: ancestors.length * INDENT_SIZE + target.field.name.length - 1,
        };
        range = getAddRangeForFieldFromLocation({
          hasSelections: true,
          location,
        });
        console.log(
          'ADD: !isRootField && !previousAncestorIsSelected - 2 - (nearestSelectedAncestor && nearestSelectedAncestorHasSelections)',
          {
            location,
            position,
            l: allUnselectedAncestors.length,
            // start
            // query newIsTestQuery {
            //   isTest
            //   person { <-- nearestSelectedAncestor
            //     name <-- nearestSelectedAncestorHasSelections
            //   }
            // }

            // end
            // query newIsTestQuery {
            //   isTest
            //   person {
            //     name
            //     friends {
            //       name <-- toggling here
            //     }
            //   }
            // }
          }
        );
      } else {
        position = {
          lineNumber: location.endToken.line + allUnselectedAncestors.length,
          column: ancestors.length * INDENT_SIZE + target.field.name.length - 1,
        };
        range = getAddRangeForFieldFromLocation({
          hasSelections: false,
          location,
        });
        console.log(
          'ADD: !isRootField && !previousAncestorIsSelected - 3 - (nearestSelectedAncestor && !nearestSelectedAncestorHasSelections)',
          {
            location,
            position,
            range,
            generateText: generateText(),
            // start
            // query newIsTestQuery {
            //   isTest
            //   person <-- nearestSelectedAncestor has no selections
            // }

            // end
            // query newIsTestQuery {
            //   isTest
            //   person {
            //     friends {
            //       name <-- toggling here
            //     }
            //   }
            // }
          }
        );
      }
    }

    return pushEdit({
      edits: [{ range, text: generateText() }],
      position,
      targetEditor: TARGET_EDITOR,
    });
  }

  return console.log(`addTargetField: we shouldn't be here...field not handled.`, {});
};
