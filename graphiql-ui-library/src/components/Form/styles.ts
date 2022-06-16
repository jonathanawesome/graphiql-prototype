import { styled } from '../../theme';

export const FormStyled = styled('form', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const StaticSubmitHandler = styled('button', {
  backgroundColor: '$scale300',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  borderRadius: 4,
});
