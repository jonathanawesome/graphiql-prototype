import { styled } from '../../../theme';

export const EasyVarsStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  fontFamily: '$mono',
  fontSize: 11,
});

export const EasyVarStyled = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  padding: '0 8px',
  border: '1px solid $scale400',
  borderRadius: 8,
  minHeight: 34,

  span: {
    // fontSize: '$body',
  },
});

export const NameAndType = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  height: '100%',
  borderRight: '1px solid $scale400',
  paddingRight: 8,
});
export const Name = styled('span', {
  color: '$accentField',
});
export const Type = styled('span', {
  display: 'flex',
  color: '$scale700',
  fontSize: '8px !important',
  lineHeight: 1,
  textTransform: 'uppercase',
  padding: 3,
  border: '1px solid $scale400',
  borderRadius: 2,
});
