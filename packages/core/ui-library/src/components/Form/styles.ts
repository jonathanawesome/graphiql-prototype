import { styled, theme } from '../../theme';

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
  backgroundColor: theme.colors.surface3,
  border: '1px solid transparent',
  color: theme.colors.text1,
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  borderRadius: 4,
  fontSize: theme.fontSizes.body,
  fontWeight: theme.fontWeights.medium,
  placeSelf: 'flex-end',

  '&:hover': {
    backgroundColor: theme.colors.surface2,
    border: `1px solid ${theme.colors.surface3}`,
  },

  '&:disabled': {
    opacity: 0.4,
  },
});
