import { Location } from 'graphql';
import { IRange } from 'monaco-editor';

// constants
import { TARGET_EDITOR } from '../../constants';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// range
import { rangeInsertBeforeClosingBracket, rangeInsertAfterField } from '../range';

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
  getStringToWrite,
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
    const location = locationFromPreviousAncestor as Location;
    console.log('ADD: isRootField && hasSiblingSelections', { location });
    // query something {
    //   aSiblingField
    //   *__insertingHere__
    // }

    return pushEdit({
      edits: [
        {
          range: rangeInsertBeforeClosingBracket({ location }),
          text: `${' '.repeat(location.startToken.column + 1)}${target.field.name}\n`,
        },
      ],
      targetEditor: TARGET_EDITOR,
    });
  }

  if (!isRootField && previousAncestor.selection && hasSiblingSelections) {
    const location = locationFromPreviousAncestor as Location;
    console.log(
      'ADD: !isRootField && previousAncestor.selection && hasSiblingSelections',
      { location }
    );
    //query something {
    //  aRootField {
    //    aNestedField
    //   *__insertingHere__
    //  }
    //}
    return pushEdit({
      edits: [
        {
          range: rangeInsertBeforeClosingBracket({ location }),
          text: `${' '.repeat(location.startToken.column + 1)}${target.field.name}\n`,
        },
      ],
      targetEditor: TARGET_EDITOR,
    });
  }

  if (!isRootField && previousAncestor.selection && !hasSiblingSelections) {
    const location = locationFromPreviousAncestor as Location;
    console.log(
      'ADD: !isRootField && previousAncestor.selection && !hasSiblingSelections',
      { location }
    );
    const stringToWrite = getStringToWrite({
      ancestor: previousAncestor,
    });

    const calculatedWrite = `${stringToWrite} {\n${' '.repeat(
      location.startToken.column + 1
    )}${target.field.name}\n${' '.repeat(location.startToken.column - 1)}}`;

    return pushEdit({
      edits: [
        {
          range: rangeInsertAfterField({
            endColumn: location.startToken.column + stringToWrite.length + 2,
            location,
          }),
          text: calculatedWrite,
        },
      ],
      targetEditor: TARGET_EDITOR,
    });
  }

  // this is the most complicated case to reckon...reader beware ☠️
  // our target is a nested field and the previous ancestor is not selected
  if (!isRootField && !previousAncestor.selection) {
    console.log('ADD: !isRootField && !previousAncestor.selection', {});

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
          endColumn: ((location.startToken.column + stringToWrite.length) as number) + 1,
        };
      }
    }

    return pushEdit({
      edits: [
        {
          range,
          text: calculatedText(),
        },
      ],
      targetEditor: TARGET_EDITOR,
    });
  }
  return console.log(`handleAddField: we shouldn't be here...field not handled.`, {});
};
