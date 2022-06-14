import { useState } from 'react';
import { FieldNode, isRequiredArgument } from 'graphql';

/** components */
import { Argument, Collapser, Column } from '../index';
import { ShowArgumentsIcon } from '../icons';

/** hooks */
import type { AncestorField, AncestorMap } from '../../hooks';

/** styles */
import { ArgumentsWrap, IconWrap, RequiredArgumentsWrap, Span } from './styles';

export const Arguments = ({
  ancestors,
  selection,
}: {
  ancestors: AncestorMap;
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

  return (
    <ArgumentsWrap>
      <RequiredArgumentsWrap>
        {requiredArgs.length > 0
          ? requiredArgs
              .sort()
              .map((arg) => (
                <Argument
                  key={arg.name}
                  ancestors={ancestors}
                  argument={arg}
                  selection={selection}
                />
              ))
          : null}
      </RequiredArgumentsWrap>
      {optionalArgs.length > 0 && (
        <Collapser
          content={
            <Column>
              {optionalArgs.length > 0
                ? optionalArgs
                    .sort()
                    .map((arg) => (
                      <Argument
                        key={arg.name}
                        ancestors={ancestors}
                        argument={arg}
                        selection={selection}
                      />
                    ))
                : null}
            </Column>
          }
          leadContent={
            <>
              {isExpanded ? (
                <Span>Hide arguments</Span>
              ) : requiredArgs.length > 0 ? (
                <Span>{`${optionalArgs.length.toString()} more arguments`}</Span>
              ) : (
                <Span>{`Show ${optionalArgs.length.toString()} optional arguments`}</Span>
              )}
            </>
          }
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          trigger={
            <IconWrap>
              <ShowArgumentsIcon />
            </IconWrap>
          }
        />
      )}
    </ArgumentsWrap>
  );
};
