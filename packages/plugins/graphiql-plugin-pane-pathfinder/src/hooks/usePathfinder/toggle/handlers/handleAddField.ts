import { Location } from 'graphql';
import { IPosition, IRange } from 'monaco-editor';

// constants
import { INDENT_SIZE, TARGET_EDITOR } from '../../constants';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// range
import {
  rangeInsertBeforePreviousAncestorClosingBracket,
  rangeInsertAfterField,
} from '../range';

// types
import {
  AncestorArgument,
  AncestorField,
  AncestorInlineFragment,
  AncestorRoot,
  AncestorsArray,
  AncestorTypes,
} from '../../types';

// utils
import { insertNewOperation } from '../insertNewOperation';
import {
  // countPreviousAncestorSelections,
  getLocationFromPreviousAncestor,
  getAncestorText,
  hasSiblingSelections as hasSiblingSelectionsFunc,
} from '../../utils';

export const handleAddField = ({
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
    previousAncestor,
  });
  const locationFromPreviousAncestor = getLocationFromPreviousAncestor({
    previousAncestor,
  });

  const isRootField = previousAncestor.type === 'ROOT';

  // console.log('handleAddField | isRootField && hasSiblingSelections', {
  //   isRootField,
  //   hasSiblingSelections,
  // });

  if (isRootField && !hasSiblingSelections && documentDefinitions === 0) {
    console.log('ADD: isRootField && !hasSiblingSelections', {});
    return insertNewOperation({ ancestors });
  }

  if (!isRootField && !hasSiblingSelections && documentDefinitions === 0) {
    console.log('ADD: !isRootField && !hasSiblingSelections', {});
    return insertNewOperation({ ancestors });
  }

  if (isRootField && hasSiblingSelections) {
    const { operations: operationsEditor } = useEditor.getState().monacoEditors;

    const location = locationFromPreviousAncestor as Location;

    const range = rangeInsertBeforePreviousAncestorClosingBracket({ location });

    const position = operationsEditor
      ?.getModel()
      ?.getPositionAt(location.end) as IPosition;

    const text = `${' '.repeat(location.startToken.column * INDENT_SIZE)}${
      target.field.name
    }\n`;

    console.log('ADD: isRootField && hasSiblingSelections', {
      position,
      location,
      text,
      textLength: text.length,
      // query something {
      //   aSiblingField
      //   *__insertingHere__
      // }
    });

    return pushEdit({
      edits: [
        {
          range,
          text,
        },
      ],
      position: { ...position, column: position.column + text.length },
      targetEditor: TARGET_EDITOR,
    });
  }

  if (!isRootField && previousAncestor.selection && hasSiblingSelections) {
    const { operations: operationsEditor } = useEditor.getState().monacoEditors;

    const location = locationFromPreviousAncestor as Location;

    const position = operationsEditor
      ?.getModel()
      ?.getPositionAt(location.end) as IPosition;

    const text = `${' '.repeat(location.startToken.column + 1)}${target.field.name}\n`;

    console.log(
      'ADD: !isRootField && previousAncestor.selection && hasSiblingSelections',
      { location, position }
      //query something {
      //  aRootField {
      //    aNestedField
      //   *__insertingHere__
      //  }
      //}
    );

    return pushEdit({
      edits: [
        {
          range: rangeInsertBeforePreviousAncestorClosingBracket({ location }),
          text,
        },
      ],
      position: { ...position, column: position.column + text.length },
      targetEditor: TARGET_EDITOR,
    });
  }

  if (!isRootField && previousAncestor.selection && !hasSiblingSelections) {
    const { operations: operationsEditor } = useEditor.getState().monacoEditors;

    const location = locationFromPreviousAncestor as Location;

    const position = operationsEditor
      ?.getModel()
      ?.getPositionAt(location.end) as IPosition;

    const stringToWrite = getAncestorText({
      ancestor: previousAncestor,
    });

    const text = `${stringToWrite} {\n${' '.repeat(location.startToken.column + 1)}${
      target.field.name
    }\n${' '.repeat(location.startToken.column - 1)}}`;

    console.log(
      'ADD: !isRootField && previousAncestor.selection && !hasSiblingSelections',
      { location, position: { ...position, column: position.column + text.length } }
      //query something {
      //  aRootField {
      //   *__insertingHereWithBrackets👆👇__
      //  }
      //}
    );

    return pushEdit({
      edits: [
        {
          range: rangeInsertAfterField({
            endColumn: location.startToken.column + stringToWrite.length + 2,
            location,
          }),
          text,
        },
      ],
      position: {
        column: position.column + text.length,
        lineNumber: position.lineNumber + 1,
      },
      targetEditor: TARGET_EDITOR,
    });
  }

  // this is the most complicated case to reckon...reader beware ☠️
  // our target is a nested field and the previous ancestor is not selected
  if (!isRootField && !previousAncestor.selection) {
    const { operations: operationsEditor } = useEditor.getState().monacoEditors;

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
        fieldText += getAncestorText({ ancestor: a });
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
      range = rangeInsertBeforePreviousAncestorClosingBracket({ location });
    } else {
      if (nearestSelectedAncestorHasSelections) {
        range = rangeInsertBeforePreviousAncestorClosingBracket({ location });
      } else {
        const stringToWrite = getAncestorText({ ancestor: nearestSelectedAncestor });
        range = {
          startLineNumber: location.startToken.line,
          startColumn: (location.startToken.column + stringToWrite.length) as number,
          endLineNumber: location.startToken.line,
          endColumn: ((location.startToken.column + stringToWrite.length) as number) + 1,
        };
      }
    }

    const position = operationsEditor
      ?.getModel()
      ?.getPositionAt(location.end) as IPosition;

    const finalPosition = {
      column: allUnselectedAncestors.length * INDENT_SIZE + 1 + target.field.name.length,
      // column: position.column + calculatedText().length,
      lineNumber: position.lineNumber + allUnselectedAncestors.length - 1,
    };

    console.log('ADD: !isRootField && !previousAncestor.selection', {
      location,
      position,
      finalPosition,
      l: allUnselectedAncestors.length,
    });

    return pushEdit({
      edits: [
        {
          range,
          text: calculatedText(),
        },
      ],
      position: finalPosition,
      targetEditor: TARGET_EDITOR,
    });
  }
  return console.log(`handleAddField: we shouldn't be here...field not handled.`, {});
};
