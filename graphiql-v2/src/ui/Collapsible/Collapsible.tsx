import React from 'react';

/** components */
import { Caret } from '../../icons';

/** styles */
import { Content, ItemGrid, Root, Trigger } from './styles';

type PopoverProps = {
  content: React.ReactElement;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  leadContent: React.ReactElement;
  toggler?: React.ReactElement;
  trigger?: React.ReactElement;
};

export const Collapsible = ({
  content,
  isExpanded,
  setIsExpanded,
  leadContent,
  toggler,
  trigger = <Caret isExpanded={isExpanded} />,
}: PopoverProps) => {
  return (
    <Root open={isExpanded} onOpenChange={setIsExpanded}>
      <ItemGrid hasToggler={!!toggler}>
        {toggler && toggler}
        <Trigger>{trigger}</Trigger>
        {leadContent}
      </ItemGrid>
      <Content>{content}</Content>
    </Root>
  );
};
