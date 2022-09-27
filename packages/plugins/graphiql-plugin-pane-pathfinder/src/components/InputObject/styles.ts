import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledInputObject = styled('div', {
  // backgroundColor: theme.colors.green_lightest,
  // minHeight: 30,
  marginTop: 8,
  marginBottom: 8,
  display: `flex`,
  alignItems: `center`,
  width: `100%`,

  ul: {
    all: 'unset',
    width: `100%`,
    margin: 0,
    // paddingLeft: theme.space[6],
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
});
