import { styled } from '../../../theme';

export const FormControlStyled = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  paddingLeft: '8px',
  border: '1px solid $scale400',
  borderRadius: 8,
  minHeight: 34,
  fontFamily: '$mono',
});

export const LabelWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  borderRight: '1px solid $scale400',
  paddingRight: 8,
});

export const Label = styled('label', {
  color: '$accentField',
  fontSize: 11,
});
