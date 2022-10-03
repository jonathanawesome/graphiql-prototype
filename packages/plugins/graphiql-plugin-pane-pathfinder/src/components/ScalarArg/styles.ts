import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledScalarArgWrap = styled('div', {
  marginTop: theme.space[1],
  marginBottom: theme.space[1],
});

export const StyledError = styled('div', {
  color: theme.colors.orange_default,
  backgroundColor: theme.colors.orange_lightest,
  borderTop: `1px solid ${theme.colors.orange_light}`,
  borderRight: `1px solid ${theme.colors.orange_light}`,
  borderBottom: `1px solid ${theme.colors.orange_light}`,
  borderLeft: `1px solid ${theme.colors.orange_light}`,
  fontSize: 10,
  padding: 2,
  marginTop: theme.space[1],
  marginBottom: theme.space[1],
});

export const StyledContainer = styled('div', {
  display: `flex`,
  gap: theme.space[3],
});
