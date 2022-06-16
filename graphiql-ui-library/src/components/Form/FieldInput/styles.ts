import { styled } from '../../../theme';

export const StyledFieldInput = styled('div', {
  width: '100%',
  fontFamily: '$mono',

  input: {
    all: 'unset',
    boxSizing: 'border-box',
    width: '100%',
    textAlign: 'right',
    color: '$accentWarning',
    paddingRight: 12,
    height: 32,
    fontSize: 11,

    '&::placeholder': {
      color: '$scale600',
    },
    '&:focus': {
      backgroundColor: '$scale200',
    },
    // '&:hover': {
    // backgroundColor: '$scale200',
    // },
  },
});
