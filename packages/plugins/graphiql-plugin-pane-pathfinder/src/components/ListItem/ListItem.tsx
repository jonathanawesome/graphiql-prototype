import { useState } from 'react';

// components
import { Details } from '../Details';
import { DeprecatedMessage } from '../DeprecatedMessage';

// icons
import { Caret } from '../../icons';

// styles
import {
  // Arguments,
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
import { SeparatorRound } from '@graphiql-prototype/ui-library';
import { DescriptionMessage } from '../DescriptionMessage';
import { Description } from '../Description';

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
  //   variant,
  // });

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
            {'description' in type && type.description && (
              <Description description={type.description} />
              // <DescriptionMessage description={type.description} />
            )}
            {collapsibleContent.arguments && collapsibleContent.arguments}
            {collapsibleContent.childFields && (
              <ChildFields
              // variant={variant}
              >
                {collapsibleContent.childFields}
              </ChildFields>
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
