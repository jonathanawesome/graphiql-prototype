import { styled, theme } from '../../../theme';

export const FormControlStyled = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  // paddingLeft: '8px',
  border: `1px solid ${theme.colors.surface3}`,
  borderRadius: 4,
  minHeight: 24,
  width: `100%`,
  // fontFamily: '$mono',
});

export const LabelWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  borderRight: `1px solid ${theme.colors.surface3}`,
  paddingRight: 8,
  paddingLeft: 8,
  backgroundColor: theme.colors.surface2,
  borderRadius: `4px 0 0 4px`,
});

export const Label = styled('label', {
  color: theme.colors.text3,
  fontSize: 12,
  whiteSpace: 'nowrap',
});
