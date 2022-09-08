import { ReactElement } from 'react';
import type * as Stitches from '@stitches/react';

//styles
import { StyledMessage } from './styles';

export const Message = ({
  message,
  type,
}: {
  message: ReactElement;
  type: Stitches.VariantProps<typeof StyledMessage>['type'];
}) => {
  return <StyledMessage type={type}>{message}</StyledMessage>;
};
