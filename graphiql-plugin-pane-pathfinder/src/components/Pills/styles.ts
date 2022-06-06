import { styled } from '@graphiql-v2-prototype/graphiql-v2';

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
  color: '$scale700 !important',
  backgroundColor: '$scale100',
  border: '1px solid $scale500',
  borderRadius: 2,
});
