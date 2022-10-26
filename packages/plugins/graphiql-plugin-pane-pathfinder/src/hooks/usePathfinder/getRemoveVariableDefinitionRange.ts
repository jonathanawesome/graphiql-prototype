import { useEditor } from '@graphiql-prototype/store';
import { Location, OperationDefinitionNode, Kind } from 'graphql';
import { IRange } from 'monaco-editor';
// import { AncestorArgument } from './types';

export const getRemoveVariableDefinitionRange = ({
  // target,
  argumentName,
  argumentTypeAsString,
  text,
}: {
  argumentName: string;
  argumentTypeAsString: string;
  // target: AncestorArgument;
  text: string;
}): IRange | null => {
  const model = useEditor.getState().monacoEditors['operations']?.getModel();

  let range: IRange | null = null;

  const activeDefinition = useEditor.getState().activeDefinition;

  const isLastVariableDefinition =
    (activeDefinition as OperationDefinitionNode).variableDefinitions?.length === 1;

  const definition = (
    activeDefinition as OperationDefinitionNode
  ).variableDefinitions?.find(
    (v) =>
      v.variable.name.value === argumentName &&
      v.type.kind === Kind.NAMED_TYPE &&
      v.type.name.value === argumentTypeAsString
  );

  const location = definition?.loc as Location;

  console.log('isLastVariableDefinition?', { isLastVariableDefinition });

  const startPosition = model?.getPositionAt(location.start as number);
  const endPosition = model?.getPositionAt(location.end as number);

  console.log('VARIABLE_DEFINITION_RANGE', { range, loc: definition?.loc });

  const { startToken, endToken } = location;

  if (isLastVariableDefinition) {
    // return here because we know it's the last argument or variable and we want to remove opening and closiing parenthesis
    return {
      startLineNumber: startToken.prev?.line as number,
      startColumn: startToken.prev?.column as number,
      endLineNumber: endToken.next?.line as number,
      endColumn: (endToken.next?.column as number) + 1,
    };
  }

  range = {
    startLineNumber: startPosition?.lineNumber as number,
    startColumn: startPosition?.column as number,
    endLineNumber: endPosition?.lineNumber as number,
    endColumn: endPosition?.column as number,
  };

  const monacoLineContent = model?.getLineContent(startPosition?.lineNumber as number);

  const lineIndentCount = monacoLineContent?.search(/\S/) || 0;

  const isSingleLine = !!(
    monacoLineContent && monacoLineContent.length < lineIndentCount + text.length + 3
  );

  if (isSingleLine) {
    // text is on a line by itself so we update our range
    range = {
      ...(range as IRange),
      startColumn: 0,
      endColumn: 0,
      endLineNumber: range.endLineNumber + 1,
    };
  }

  console.log('getRemoveVariableDefinitionRange', {
    range,
    monacoLineContent,
    monacoLineLength: monacoLineContent && monacoLineContent.length,
    copyLength: lineIndentCount + text.length + 3,
    isSingleLine,
    text,
  });

  return range;
};
