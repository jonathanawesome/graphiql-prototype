import React from 'react';

/** components */
import { Caret } from '../icons';

/** styles */
import { Content, ItemGrid, Root, Trigger } from './styles';

type CollapserProps = {
  content: React.ReactElement;
  isExpanded: boolean;
  leadContent: React.ReactElement;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  toggler?: React.ReactElement;
  trigger?: React.ReactElement;
};

export const Collapser = ({
  content,
  isExpanded,
  leadContent,
  setIsExpanded,
  toggler,
  trigger = <Caret isExpanded={isExpanded} />,
}: CollapserProps) => {
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
