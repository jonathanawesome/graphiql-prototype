import { InlineFragmentNode, FieldNode, Location } from 'graphql';
import { IRange } from 'monaco-editor';

// constants
import { TARGET_EDITOR } from '../../constants';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// types
import { AncestorField, AncestorsArray, AncestorTypes } from '../../types';

// utils
import {
  getLocationFromAncestor,
  getRemoveRangeForFieldFromLocation,
  hasSiblingSelections as hasSiblingSelectionsFunc,
} from '../../utils';

export const handleRemoveField = ({
  ancestors,
  previousAncestor,
  target,
}: {
  ancestors: AncestorsArray;
  previousAncestor: AncestorTypes;
  target: AncestorField;
}) => {
  const pushEdit = useEditor.getState().pushEdit;
  const documentDefinitions = useEditor.getState().documentDefinitions;

  const position = useEditor.getState().monacoEditors['operations']?.getPosition() || {
    column: 1,
    lineNumber: 1,
  };

  const location = target.selection?.loc as Location;

  const hasSiblingSelections = hasSiblingSelectionsFunc({
    mode: 'REMOVE',
    previousAncestor,
  });

  const locationFromPreviousAncestor = getLocationFromAncestor({
    ancestor: previousAncestor,
  });

  const isRootField = previousAncestor.type === 'ROOT';

  const isNestedField =
    previousAncestor.type === 'FIELD' || previousAncestor.type === 'INLINE_FRAGMENT';

  if (isRootField && !hasSiblingSelections && documentDefinitions < 2) {
    console.log(
      'REMOVE: isRootField && !hasSiblingSelections && documentDefinitions < 2',
      {}
      // start
      // query newImageQuery {
      //   isTest
      // }

      //end
      // empty!
    );

    return pushEdit({
      edits: [
        {
          range: useEditor
            .getState()
            .getActiveTab()
            ['operationsModel'].getFullModelRange(),
          text: null,
        },
      ],
      position,
      targetEditor: TARGET_EDITOR,
    });
  }

  if (!isNestedField && hasSiblingSelections) {
    console.log('REMOVE: !isNestedField && hasSiblingSelections', {
      location,
    });

    if (
      target.selection &&
      'selectionSet' in target.selection &&
      target.selection.selectionSet
    ) {
      // if this field has existing selections, we use an expanded range

      const range = getRemoveRangeForFieldFromLocation({
        location,
        mode: 'FIELD_WITH_SELECTIONS',
      });

      return pushEdit({
        edits: [
          {
            range,
            text: null,
          },
        ],
        position,
        targetEditor: TARGET_EDITOR,
      });
    } else {
      // if this field does not have selections, we just remove the field

      const range = getRemoveRangeForFieldFromLocation({
        location,
        mode: 'SINGLE_CHILD_FIELD',
      });

      return pushEdit({
        edits: [
          {
            range,
            text: null,
          },
        ],
        position,
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

            range = getRemoveRangeForFieldFromLocation({
              location: locationFromPreviousAncestor as Location,
              mode: 'ALL_SELECTIONS_ON_FIELD',
            });
          } else {
            // this field's parent (an inline fragment) is not the only selection remaining on the inlineFragmentParentField
            range = getRemoveRangeForFieldFromLocation({
              location: locationFromPreviousAncestor as Location,
              mode: 'FIELD_WITH_SELECTIONS',
            });
          }
        } else {
          // the previous ancestor is an inline fragment and this field is not the only selection
          range = getRemoveRangeForFieldFromLocation({
            location: locationFromPreviousAncestor as Location,
            mode: 'ALL_SELECTIONS_ON_FIELD',
          });
        }
      } else {
        // this field is the only selection of it's parent and there are no inline fragments in it's ancestry
        range = getRemoveRangeForFieldFromLocation({
          location,
          mode: 'ALL_SELECTIONS_ON_FIELD',
        });
      }

      console.log('REMOVE: this is not a top level field and is the only selection', {
        location,
        range,
      });

      return pushEdit({
        edits: [{ range, text: null }],
        position,
        targetEditor: TARGET_EDITOR,
      });
    }

    if (hasSiblingSelections) {
      console.log('REMOVE: this is not a top level field but there are other selections');
      if ((target.selection as FieldNode | InlineFragmentNode).selectionSet) {
        // if this field has existing selections, we use an expanded range
        const range = getRemoveRangeForFieldFromLocation({
          location,
          mode: 'FIELD_WITH_SELECTIONS',
        });

        return pushEdit({
          edits: [{ range, text: null }],
          position,
          targetEditor: TARGET_EDITOR,
        });
      } else {
        // if this field does not have selections, we just remove the field
        const range = getRemoveRangeForFieldFromLocation({
          location,
          mode: 'SINGLE_CHILD_FIELD',
        });

        return pushEdit({
          edits: [{ range, text: null }],
          position,
          targetEditor: TARGET_EDITOR,
        });
      }
    }
  }

  return console.log(`handleRemoveField: we shouldn't be here...field not handled.`, {});
};
