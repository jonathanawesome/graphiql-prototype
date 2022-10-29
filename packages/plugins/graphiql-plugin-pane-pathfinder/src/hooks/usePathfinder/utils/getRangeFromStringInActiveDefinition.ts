import { IRange } from 'monaco-editor';

// store
import { useEditor } from '@graphiql-prototype/store';

// utils
import { getActiveDefinitionRange } from './getActiveDefinitionRange';

export const getRangeFromStringInActiveDefinition = ({
  string,
}: {
  string: string;
}): IRange | null => {
  const model = useEditor.getState().monacoEditors['operations']?.getModel();

  const activeDefinitionRange = getActiveDefinitionRange();

  if (model && activeDefinitionRange) {
    const matches = model.findMatches(
      string,
      activeDefinitionRange,
      false,
      false,
      null,
      true
    );

    // console.log('matches', { matches, string });

    if (matches.length > 1) {
      console.warn('more than one match returned');
    } else if (matches.length === 0) {
      console.warn('no matches returned');
    } else {
      return matches[0].range;
    }
  }

  return null;
};
