import { css, theme } from '@graphiql-prototype/ui-library';

export const StyledDeprecatedMessage = css({
  display: `flex`,
  flexDirection: `column`,
  gap: theme.space[2],
  marginBottom: theme.space[3],

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
  },
});
