import { styled } from '../../theme';

export const FormStyled = styled('form', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  margin: '12px 0',
});

export const StaticSubmitHandler = styled('button', {
  backgroundColor: '$scale100',
  border: '1px solid $scale500',
  color: '$scale800',
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  borderRadius: 4,
  fontSize: 12,
  placeSelf: 'flex-end',

  '&:hover': {
    backgroundColor: '$scale200',
    border: '1px solid $scale600',
  },
});
