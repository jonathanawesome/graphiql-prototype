import { useEffect, useState } from 'react';

// components
import { Details } from '../Details';
import { DeprecatedMessage } from '../DeprecatedMessage';
import { SeparatorRound } from '@graphiql-prototype/ui-library';

// icons
import { Caret } from '../../icons';

// styles
import {
  ChildFields,
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  Layout,
  ListItemStyled,
  StyledLeafIndicator,
} from './styles';

// types
import { Toggler } from '../Toggler';

// types
import { ListItemProps } from './types';

export const ListItem = ({
  collapsibleContent,
  isSelected,
  toggler,
  type,
  variant,
}: ListItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // console.log('ListItem', {
  //   type: type.name,
  //   isSelected,
  //   variant,
  // });

  useEffect(() => {
    // this effect ensures the field is initially expanded when selected
    // this is one of the many micro-interactions in pathfinder that need tweaking/testing
    if (isSelected) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isSelected]);

  if (collapsibleContent) {
    return (
      <CollapsibleRoot asChild open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <ListItemStyled>
          <Layout hasToggler={!!toggler} isCollapsible={true}>
            <CollapsibleTrigger
              aria-label={`Expand nested content of ${type.name} ${variant}`}
              isOpen={isOpen}
              type="button"
              variant={variant}
            >
              <Caret />
            </CollapsibleTrigger>
            {toggler && (
              <Toggler
                {...toggler}
                collapser={{
                  isOpen,
                  setIsOpen,
                }}
              />
            )}
            <Details isSelected={isSelected} type={type} variant={variant} />
          </Layout>
          <CollapsibleContent isOpen={isOpen} variant={variant}>
            {'deprecationReason' in type && type.deprecationReason && (
              <DeprecatedMessage deprecationReason={type.deprecationReason} />
            )}

            {collapsibleContent.arguments && collapsibleContent.arguments}
            {collapsibleContent.childFields && (
              <ChildFields>{collapsibleContent.childFields}</ChildFields>
            )}
          </CollapsibleContent>
        </ListItemStyled>
      </CollapsibleRoot>
    );
  }

  return (
    <ListItemStyled>
      <Layout hasToggler={!!toggler} isCollapsible={false}>
        <StyledLeafIndicator>
          <SeparatorRound />
        </StyledLeafIndicator>
        {toggler && <Toggler {...toggler} />}
        <Details isSelected={isSelected} type={type} variant={variant} />
      </Layout>
    </ListItemStyled>
  );
};
