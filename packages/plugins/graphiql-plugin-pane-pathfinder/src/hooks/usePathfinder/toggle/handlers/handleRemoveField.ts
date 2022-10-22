import { InlineFragmentNode, FieldNode, Location } from 'graphql';
import { IRange } from 'monaco-editor';

// constants
import { TARGET_EDITOR } from '../../constants';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// range
import {
  rangeRemoveForFieldWithSelections,
  rangeRemoveForSingleLine,
  rangeRemoveForAllSelectionsOfField,
} from '../range';

// types
import { AncestorField, AncestorsArray, AncestorTypes } from '../../types';

// utils
import {
  getLocationFromPreviousAncestor,
  hasSiblingSelections as hasSiblingSelectionsFunc,
} from '../../utils';

export const handleRemoveField = ({
  ancestors,
  isNestedField,
  previousAncestor,
  target,
}: {
  ancestors: AncestorsArray;
  isNestedField: boolean;
  previousAncestor: AncestorTypes;
  target: AncestorField;
}) => {
  const pushEdit = useEditor.getState().pushEdit;
  const documentDefinitions = useEditor.getState().documentDefinitions;

  const location = target.selection?.loc as Location;

  const hasSiblingSelections = hasSiblingSelectionsFunc({
    previousAncestor,
  });
  const locationFromPreviousAncestor = getLocationFromPreviousAncestor({
    previousAncestor,
  });

  if (!isNestedField && !hasSiblingSelections && documentDefinitions <= 1) {
    // console.log('REMOVE: this is a top level field and is the only selection', {});
    return pushEdit({
      edits: [
        {
          range: activeEditorTab.operationsModel.getFullModelRange(),
          text: null,
        },
      ],
      targetEditor: TARGET_EDITOR,
    });
  }

  if (!isNestedField && hasSiblingSelections) {
    // console.log(
    //   'REMOVE: this is a top level field but there are other top level selections'
    // );

    if (
      target.selection &&
      'selectionSet' in target.selection &&
      target.selection.selectionSet
    ) {
      // if this field has existing selections, we use an expanded range
      return pushEdit({
        edits: [
          {
            range: rangeRemoveForFieldWithSelections({ location }),
            text: null,
          },
        ],
        targetEditor: TARGET_EDITOR,
      });
    } else {
      // if this field does not have selections, we just remove the field
      return pushEdit({
        edits: [
          {
            range: rangeRemoveForSingleLine({ location }),
            text: null,
          },
        ],
        targetEditor: TARGET_EDITOR,
      });
    }
  }

  if (isNestedField) {
    if (!hasSiblingSelections) {
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
      return pushEdit({
        edits: [
          {
            range,
            text: null,
          },
        ],
        targetEditor: TARGET_EDITOR,
      });
    }

    if (hasSiblingSelections) {
      console.log('REMOVE: this is not a top level field but there are other selections');
      if ((target.selection as FieldNode | InlineFragmentNode).selectionSet) {
        // if this field has existing selections, we use an expanded range
        return pushEdit({
          edits: [
            {
              range: rangeRemoveForFieldWithSelections({ location }),
              text: null,
            },
          ],
          targetEditor: TARGET_EDITOR,
        });
      } else {
        // if this field does not have selections, we just remove the field
        return pushEdit({
          edits: [
            {
              range: rangeRemoveForSingleLine({ location }),
              text: null,
            },
          ],
          targetEditor: TARGET_EDITOR,
        });
      }
    }
  }
  return console.log(`handleRemoveField: we shouldn't be here...field not handled.`, {});
};
