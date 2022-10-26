import { useEditor } from '@graphiql-prototype/store';
import { Location, TokenKind } from 'graphql';
import { IRange } from 'monaco-editor';
import { AncestorArgument } from './types';

export const getRemoveArgumentRange = ({
  target,
  text,
}: {
  target: AncestorArgument;
  text: string;
}): IRange | null => {
  const model = useEditor.getState().monacoEditors['operations']?.getModel();

  let range: IRange | null = null;

  const location = target.selection?.loc as Location;

  const isLastArgument =
    target.selection?.loc?.endToken.next?.kind === TokenKind.PAREN_R &&
    target.selection?.loc?.startToken.prev?.kind === TokenKind.PAREN_L;

  console.log('isLastArgument?', { isLastArgument });

  const startPosition = model?.getPositionAt(target.selection?.loc?.start as number);
  const endPosition = model?.getPositionAt(target.selection?.loc?.end as number);

  const { startToken, endToken } = location;

  if (isLastArgument) {
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

  console.log('getRemoveArgumentRange', {});

  return range;
};
