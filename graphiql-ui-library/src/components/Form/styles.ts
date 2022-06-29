import { styled } from '../../theme';

export const FormStyled = styled('form', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,

  fieldset: {
    all: 'unset',
    boxSizing: 'border-box',
    '&:disabled': {
      opacity: 0.4,
    },
  },
});

export const StaticSubmitHandlerButton = styled('button', {
  backgroundColor: '$gray010',
  border: '1px solid transparent',
  color: '$gray100',
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  borderRadius: 4,
  fontSize: '$body',
  fontWeight: '$medium',
  placeSelf: 'flex-end',

  '&:hover': {
    backgroundColor: '$gray015',
    border: '1px solid $gray015',
  },

  '&:disabled': {
    opacity: 0.4,
  },
});
