import React from 'react';
import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const StyledColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 12,
  marginLeft: 8,
  paddingLeft: 12,
  borderLeft: '1px solid $gray015',

  variants: {
    gap: {
      ['8']: {
        gap: 8,
      },
      ['12']: {
        gap: 12,
      },
      ['16']: {
        gap: 16,
      },
    },
  },
});

export const Column: React.FC<{ gap?: '8' | '12' | '16' }> = ({
  children,
  gap = '12',
}) => {
  return <StyledColumn gap={gap}>{children}</StyledColumn>;
};
