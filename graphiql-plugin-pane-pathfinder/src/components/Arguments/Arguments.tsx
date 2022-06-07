import { useState } from 'react';
import { FieldNode, isRequiredArgument } from 'graphql';

/** components */
import { Argument, ShowArguments } from '../index';

/** styles */
import { OptionalArgs, Root, Content, Trigger } from './styles';

/** hooks */
import type { AncestorField, AncestorMap } from '../../hooks';

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

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // TODO: this is gross
  const requiredArgs = args.filter((a) => isRequiredArgument(a));
  const optionalArgs = args.filter((a) => !isRequiredArgument(a));

  return (
    <Root open={isOpen} onOpenChange={setIsOpen}>
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
      {optionalArgs.length > 0 && (
        <OptionalArgs>
          <Trigger>
            <ShowArguments
              isOpen={isOpen}
              optionalArgsCount={optionalArgs.length}
              requiredArgsCount={requiredArgs.length}
            />
          </Trigger>

          <Content>
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
          </Content>
        </OptionalArgs>
      )}
    </Root>
  );
};
