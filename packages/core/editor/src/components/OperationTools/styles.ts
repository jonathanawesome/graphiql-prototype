import { css, theme } from '@graphiql-prototype/ui-library';

export const StyledVariablesWrap = css({
  padding: theme.space[4],
  // maxHeight: 300,
  // minHeight: 120,
  // overflowY: `auto`,
  // height: '100%',
  width: '100%',
});

export const StyledPerTabHeaders = css({
  display: `flex`,
  flexDirection: `column`,
  gap: theme.space[6],
  paddingTop: theme.space[6],
  paddingRight: theme.space[4],
  paddingBottom: theme.space[6],
  paddingLeft: theme.space[4],
});
