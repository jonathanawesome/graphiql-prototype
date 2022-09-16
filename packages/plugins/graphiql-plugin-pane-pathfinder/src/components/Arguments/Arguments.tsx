import { useState } from 'react';
import { FieldNode, isRequiredArgument, OperationTypeNode } from 'graphql';

// components
import { Argument } from '../index';
import { Caret } from '../../icons';

// hooks
import type { AncestorField, AncestorMap } from '../../hooks';

// styles
import {
  StyledArguments,
  StyledArgumentsContent,
  StyledArgumentsList,
  StyledArgumentsTrigger,
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

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <StyledArguments isOpen={isOpen} open={isOpen} onOpenChange={setIsOpen}>
      <StyledArgumentsTrigger isOpen={isOpen}>
        <Caret />
        <span>arguments</span>
      </StyledArgumentsTrigger>
      <StyledArgumentsContent isOpen={isOpen}>
        <StyledArgumentsList>
          {args.map((arg) => (
            <Argument
              key={arg.name}
              ancestors={ancestors}
              argument={arg}
              operationType={operationType}
              selection={selection}
            />
          ))}
        </StyledArgumentsList>
      </StyledArgumentsContent>
    </StyledArguments>
  );
};
