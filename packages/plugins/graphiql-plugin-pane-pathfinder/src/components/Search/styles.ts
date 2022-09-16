import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledSearch = styled('div', {
  width: '100%',

  '& input': {
    all: `unset`,
    boxSizing: 'border-box',
    width: `100%`,
    height: `100%`,
    paddingLeft: theme.space[3],
    fontSize: theme.fontSizes.body,

    '&::placeholder': {
      color: theme.colors.text4,
    },
    '&:focus, &:hover': {
      // backgroundColor: '$appBackground',
    },
  },
});
