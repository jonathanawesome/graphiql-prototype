import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledRootOperation = styled('ul', {
  height: '100%',
  width: '100%',
  overflowY: 'auto',
  padding: theme.space[6],
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});
