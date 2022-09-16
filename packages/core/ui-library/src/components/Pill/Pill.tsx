import { styled, theme } from '../../theme';

export const PillStyled = styled('span', {
  display: 'inline-flex',
  color: theme.colors.text3,
  fontSize: '8px !important',
  lineHeight: 1,
  textTransform: 'uppercase',
  padding: 3,
  border: `1px solid ${theme.colors.text4}`,
  borderRadius: 2,
});

export const Pill = ({ copy }: { copy: string }) => {
  return <PillStyled>{copy}</PillStyled>;
};
