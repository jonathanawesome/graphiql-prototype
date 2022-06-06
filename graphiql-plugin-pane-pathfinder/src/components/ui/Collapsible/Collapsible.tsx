import React from 'react';

/** components */
import { Caret } from '../../icons';

/** styles */
import { Root, Lead, Trigger, Content } from './styles';

type PopoverProps = {
  content: React.ReactElement;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  leadContent: React.ReactElement;
  toggler?: React.ReactElement;
};

export const Collapsible = ({
  content,
  isExpanded,
  setIsExpanded,
  leadContent,
  toggler,
}: PopoverProps) => {
  return (
    <Root open={isExpanded} onOpenChange={setIsExpanded}>
      <Lead hasToggler={!!toggler}>
        {toggler && toggler}
        <Trigger>
          <Caret isExpanded={isExpanded} />
        </Trigger>
        {leadContent}
      </Lead>
      <Content>{content}</Content>
    </Root>
  );
};
