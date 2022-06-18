import { styled } from '../../theme';

export const FormStyled = styled('form', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const StaticSubmitHandler = styled('button', {
  backgroundColor: '$scale200',
  border: '1px solid transparent',
  color: '$scale800',
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
    backgroundColor: '$scale300',
    border: '1px solid $scale400',
  },
});
