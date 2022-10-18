import { useState, useEffect } from 'react';
import { FieldNode } from 'graphql';

// components
import { Argument } from '../index';
import { Button } from '@graphiql-prototype/ui-library';

// hooks
import type { AncestorField, AncestorsArray } from '../../hooks';

// styles
import {
  StyledArguments,
  StyledArgumentsContent,
  StyledArgumentsLeadWrap,
  StyledArgumentsList,
} from './styles';

export const Arguments = ({
  ancestors,
  selection,
}: {
  ancestors: AncestorsArray;
  selection: FieldNode | null;
}) => {
  // console.log('rendering Arguments', {
  //   // args,
  //   selection,
  //   'selection.arguments': selection?.arguments,
  // });

  const { field } = ancestors[ancestors.length - 1] as AncestorField;

  const { args } = field;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    // this effect ensures the field is initially expanded when selected
    // this is one of the many micro-interactions in pathfinder that need tweaking/testing
    if (selection?.arguments && selection?.arguments.length > 0) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledArguments>
      <StyledArgumentsLeadWrap isExpanded={isExpanded}>
        <Button
          action={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={field.name}
          icon="Caret"
          label={`Expand nested content of ${field.name} arguments`}
          size="SMALL"
          style="ICON"
        />
        <span>Arguments</span>
      </StyledArgumentsLeadWrap>
      <StyledArgumentsContent id={field.name} isExpanded={isExpanded}>
        <StyledArgumentsList>
          {args.map((arg) => (
            <Argument
              key={arg.name}
              ancestors={[
                ...ancestors,
                {
                  type: 'ARGUMENT',
                  argument: arg,
                  selection: selection?.arguments?.find((a) => a.name.value === arg.name),
                },
              ]}
            />
          ))}
        </StyledArgumentsList>
      </StyledArgumentsContent>
    </StyledArguments>
  );
};
