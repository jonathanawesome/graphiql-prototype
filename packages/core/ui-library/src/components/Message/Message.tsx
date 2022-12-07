import { ReactElement } from 'react';
import type * as Stitches from '@stitches/core';

//styles
import { StyledMessage } from './styles';

export const Message = ({
  message,
  variant,
}: {
  message: ReactElement;
  variant: Stitches.VariantProps<typeof StyledMessage>['variant'];
}) => {
  return <div className={StyledMessage({ variant })}>{message}</div>;
};
