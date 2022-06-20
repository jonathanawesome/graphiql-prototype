import { styled } from '../../../theme';

export const StyledFieldInput = styled('div', {
  width: '100%',
  fontFamily: '$mono',

  input: {
    all: 'unset',
    boxSizing: 'border-box',
    width: '100%',
    textAlign: 'right',
    color: '$warning100',
    paddingRight: 12,
    height: 32,
    fontSize: 11,
    borderRadius: '0 7px 7px 0',

    '&::placeholder': {
      color: '$gray040',
    },
    '&:focus': {
      backgroundColor: '$appBackground',
    },
  },
});
