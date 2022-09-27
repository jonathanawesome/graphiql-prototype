import { ReactElement } from 'react';
import type * as Stitches from '@stitches/react';

//styles
import { StyledMessage } from './styles';

export const Message = ({
  message,
  variant,
}: {
  message: ReactElement;
  variant: Stitches.VariantProps<typeof StyledMessage>['variant'];
}) => {
  return <StyledMessage variant={variant}>{message}</StyledMessage>;
};
