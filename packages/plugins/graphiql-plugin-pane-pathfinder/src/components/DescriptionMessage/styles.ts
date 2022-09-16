import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledDescriptionMessage = styled('div', {
  display: `flex`,
  flexDirection: `column`,
  gap: theme.space[2],
  marginBottom: theme.space[4],

  span: {
    display: `block`,
    letterSpacing: `0.5px`,
    fontSize: 10,
    fontWeight: theme.fontWeights.medium,
    textTransform: `uppercase`,
    marginBottom: theme.space[2],
  },

  p: {
    all: `unset`,
    lineHeight: 1.4,
  },
});
