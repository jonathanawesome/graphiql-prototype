import { useState } from 'react';

// components
import { Details } from '../Details';

// icons
import { Caret } from '../../icons';

// styles
import {
  Arguments,
  ChildFields,
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  Layout,
  ListItemStyled,
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
  const [isExpanded, setIsExpanded] = useState<boolean>(variant === 'ROOT');

  // console.log('ListItem', { collapsibleContent });

  if (collapsibleContent) {
    return (
      <ListItemStyled>
        <CollapsibleRoot open={isExpanded} onOpenChange={setIsExpanded}>
          <Layout hasToggler={!!toggler} isCollapsible={true}>
            {toggler && <Toggler {...toggler} />}
            <CollapsibleTrigger isExpanded={isExpanded}>
              <Caret />
            </CollapsibleTrigger>
            <Details isSelected={isSelected} type={type} variant={variant} />
          </Layout>
          <CollapsibleContent>
            {collapsibleContent.arguments && (
              <Arguments>{collapsibleContent.arguments}</Arguments>
            )}
            {collapsibleContent.childFields && (
              <ChildFields variant={variant}>
                {collapsibleContent.childFields}
              </ChildFields>
            )}
          </CollapsibleContent>
        </CollapsibleRoot>
      </ListItemStyled>
    );
  }

  return (
    <ListItemStyled>
      <Layout hasToggler={!!toggler} isCollapsible={false}>
        {toggler && <Toggler {...toggler} />}
        <Details isSelected={isSelected} type={type} variant={variant} />
      </Layout>
    </ListItemStyled>
  );
};
