import { useState } from 'react';
import { FieldNode, isRequiredArgument, OperationTypeNode } from 'graphql';

// components
import { Argument, Collapser, Column } from '../index';
import { ShowArgumentsIcon } from '../../icons';

// hooks
import type { AncestorField, AncestorMap } from '../../hooks';

// styles
import {
  ShowArgumentsIconWrap,
  RequiredArguments,
  Span,
  Content,
  Root,
  Trigger,
} from './styles';

export const Arguments = ({
  ancestors,
  operationType,
  selection,
}: {
  ancestors: AncestorMap;
  operationType: OperationTypeNode;
  selection: FieldNode | null;
}) => {
  // console.log('rendering Arguments', {
  //   args,
  //   selection,
  //   'selection.arguments': selection?.arguments,
  // });

  const { field } = ancestors.values().next().value as AncestorField;

  const { args } = field;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // TODO: this is gross
  const requiredArgs = args.filter((a) => isRequiredArgument(a));
  const optionalArgs = args.filter((a) => !isRequiredArgument(a));

  const optionalArgsLength = optionalArgs.length;

  return (
    <>
      {requiredArgs.length > 0 ? (
        <RequiredArguments>
          {requiredArgs.sort().map((arg) => (
            <Argument
              key={arg.name}
              ancestors={ancestors}
              argument={arg}
              operationType={operationType}
              selection={selection}
            />
          ))}
        </RequiredArguments>
      ) : null}
      {optionalArgsLength > 0 && (
        <Root open={isExpanded} onOpenChange={setIsExpanded}>
          <Trigger isExpanded={isExpanded}>
            <ShowArgumentsIconWrap>
              <ShowArgumentsIcon />
            </ShowArgumentsIconWrap>
            {isExpanded ? (
              <Span>Hide arguments</Span>
            ) : requiredArgs.length > 0 ? (
              <Span>{`${optionalArgsLength.toString()} more argument${
                optionalArgsLength > 1 ? 's' : ''
              }`}</Span>
            ) : (
              <Span>{`Show ${optionalArgsLength.toString()} optional argument${
                optionalArgsLength > 1 ? 's' : ''
              }`}</Span>
            )}
          </Trigger>
          <Content>
            <ul>
              {optionalArgs.sort().map((arg) => (
                <Argument
                  key={arg.name}
                  ancestors={ancestors}
                  argument={arg}
                  operationType={operationType}
                  selection={selection}
                />
              ))}
            </ul>
          </Content>
        </Root>
      )}
    </>
  );
};
