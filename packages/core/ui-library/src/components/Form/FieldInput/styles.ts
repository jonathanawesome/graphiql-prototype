import { styled, theme } from '../../../theme';

export const StyledFieldInput = styled('div', {
  width: '100%',
  // fontFamily: '$mono',

  input: {
    all: 'unset',
    boxSizing: 'border-box',
    width: '100%',
    textAlign: 'right',
    color: theme.colors.text2,
    paddingRight: 12,
    height: 24,
    fontSize: 12,
    borderRadius: '0 4px 4px 0',

    '&::placeholder': {
      // color: '$gray060',
      color: theme.colors.text4,
    },
    '&:focus, &:hover': {
      backgroundColor: theme.colors.surface2,
    },
  },
});
