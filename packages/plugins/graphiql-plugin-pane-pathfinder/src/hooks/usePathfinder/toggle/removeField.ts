import { IRange } from 'monaco-editor';
import { Location } from 'graphql';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// types
import { AncestorField, AncestorsArray } from '../types';

const activeEditorTab = useEditor.getState().getActiveTab();
const updateModel = useEditor.getState().updateModel;

const targetModel = 'operationsModel';

export const removeField = ({
  ancestors,
  // index,
  target,
}: {
  ancestors: AncestorsArray;
  target: AncestorField;
  // index: number;
  // eslint-disable-next-line consistent-return
}) => {
  const location = target.selection?.loc as Location;

  const ancestorSelectionsCount = target.selectionSet?.selections.length;

  const index = ancestors.findIndex((a) => a === target);

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
};
