import { IRange } from 'monaco-editor';

// store
import { useEditor } from '@graphiql-prototype/store';

export const getActiveDefinitionRange = (): IRange | null => {
  const activeDefinition = useEditor.getState().activeDefinition;
  if (activeDefinition?.loc) {
    return {
      startColumn: activeDefinition.loc.startToken.column,
      endColumn: activeDefinition.loc.endToken.column + 1,
      startLineNumber: activeDefinition.loc.startToken.line,
      endLineNumber: activeDefinition.loc.endToken.line,
    };
  }
  return null;
};
