import { useState } from 'react';

// components
import { Caret } from '../../icons';
import { Markdown } from '@graphiql-prototype/ui-library';

// styles
import {
  StyledDescription,
  StyledDescriptionContent,
  StyledDescriptionTrigger,
} from './styles';

export const Description = ({ description }: { description: string }) => {
  // console.log('rendering Description', {
  //   description,
  // });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <StyledDescription isOpen={isOpen} open={isOpen} onOpenChange={setIsOpen}>
      <StyledDescriptionTrigger isOpen={isOpen}>
        <Caret />
        <span>Description</span>
      </StyledDescriptionTrigger>
      <StyledDescriptionContent>
        <Markdown content={description} />
      </StyledDescriptionContent>
    </StyledDescription>
  );
};
