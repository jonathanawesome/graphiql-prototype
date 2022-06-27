import React from 'react';
import { PopperArrowProps, PopperContentProps } from '@radix-ui/react-popover';

// styles
import { PopoverWrap, PopoverArrow, PopoverContent, PopoverTrigger } from './styles';

type PopoverProps = {
  arrowOptions?: Pick<PopperArrowProps, 'offset'>;
  contentOptions?: Pick<PopperContentProps, 'align' | 'sideOffset'>;
  content: React.ReactElement;
  icon: React.ReactElement;
};

export const Popover = ({
  arrowOptions = { offset: 5 },
  contentOptions = { align: 'end', sideOffset: 5 },
  content,
  icon,
}: PopoverProps) => {
  return (
    <PopoverWrap>
      <PopoverTrigger asChild>
        <button>{icon}</button>
      </PopoverTrigger>
      <PopoverContent sideOffset={contentOptions.sideOffset} align={contentOptions.align}>
        {content}
        <PopoverArrow offset={arrowOptions.offset} />
      </PopoverContent>
    </PopoverWrap>
  );
};
