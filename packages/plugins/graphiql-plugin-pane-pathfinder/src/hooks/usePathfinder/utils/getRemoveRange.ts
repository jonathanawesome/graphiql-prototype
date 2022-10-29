import { Location, TokenKind, OperationDefinitionNode, Kind } from 'graphql';
import { IRange, IPosition } from 'monaco-editor';

// store
import { useEditor } from '@graphiql-prototype/store';

// types
import { AncestorArgument } from '../types';

// utils
import { getRangeFromStringInActiveDefinition } from './getRangeFromStringInActiveDefinition';

export const getRemoveRange = ({
  mode,
  target,
  text,
}: {
  mode: 'ARGUMENT' | 'VARIABLE_DEFINITION';
  target: AncestorArgument;
  text: string;
}): IRange | null => {
  const model = useEditor.getState().monacoEditors['operations']?.getModel();

  let range: IRange | null = null;
  let location: Location | null = null;
  let isLastArgumentOrVariable = false;
  let startPosition: IPosition | undefined = undefined;
  let endPosition: IPosition | undefined = undefined;

  // let's get our initial start and end positions
  if (mode === 'ARGUMENT') {
    location = target.selection?.loc as Location;

    // if the previous token is "(" and the next token is ")", we're targeting the last remaining argument
    isLastArgumentOrVariable =
      target.selection?.loc?.startToken.prev?.kind === TokenKind.PAREN_L &&
      target.selection?.loc?.endToken.next?.kind === TokenKind.PAREN_R;

    startPosition = model?.getPositionAt(target.selection?.loc?.start as number);
    endPosition = model?.getPositionAt(target.selection?.loc?.end as number);
  } else {
    // mode is "VARIABLE_DEFINITION"
    const activeDefinition = useEditor.getState().activeDefinition;

    const definition = (
      activeDefinition as OperationDefinitionNode
    ).variableDefinitions?.find(
      (v) =>
        v.variable.name.value === target.argument.name &&
        v.type.kind === Kind.NAMED_TYPE &&
        v.type.name.value === target.argument.type.toString()
    );

    if (!definition) {
      //variable definition does not exist, let's bail
      return null;
    }

    location = definition?.loc as Location;
    isLastArgumentOrVariable =
      (activeDefinition as OperationDefinitionNode).variableDefinitions?.length === 1;

    startPosition = model?.getPositionAt(definition?.loc?.start as number);
    endPosition = model?.getPositionAt(definition?.loc?.end as number);
  }

  const { startToken, endToken } = location;

  if (isLastArgumentOrVariable) {
    // return here because we know it's the last argument or variable and we want to remove opening and closing parenthesis
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

  const testForLeadingComma = getRangeFromStringInActiveDefinition({
    string: `, ${text}`,
  });

  if (testForLeadingComma) {
    range = testForLeadingComma;
  }

  const testForTrailingComma = getRangeFromStringInActiveDefinition({
    string: `${text}, `,
  });

  if (testForTrailingComma) {
    range = testForTrailingComma;
  }

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

  return range;
};
