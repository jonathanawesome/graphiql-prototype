import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledTopBar = styled('div', {
  position: `relative`,
  width: '100%',
  height: '100%',
  paddingRight: 48,
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.colors.surface3}`,
});
