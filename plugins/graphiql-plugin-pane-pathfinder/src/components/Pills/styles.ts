import { styled } from '@graphiql-prototype/graphiql-ui-library';

export const StyledPills = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const StyledPill = styled('span', {
  display: 'flex',
  alignItems: 'center',
  padding: 2,
  fontSize: 7,
  textTransform: 'uppercase',
  color: '$gray060 !important',
  // backgroundColor: '$gray007',
  border: '1px solid $gray015',
  borderRadius: 2,
});
