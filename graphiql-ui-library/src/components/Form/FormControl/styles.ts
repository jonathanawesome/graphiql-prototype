import { styled } from '../../../theme';

export const FormControlStyled = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  paddingLeft: '8px',
  border: '1px solid $gray015',
  borderRadius: 8,
  minHeight: 34,
  fontFamily: '$mono',
});

export const LabelWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  borderRight: '1px solid $gray015',
  paddingRight: 8,
});

export const Label = styled('label', {
  color: '$secondary100',
  fontSize: 12,
  whiteSpace: 'nowrap',
});
