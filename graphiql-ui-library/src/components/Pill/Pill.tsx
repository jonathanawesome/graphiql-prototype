import { styled } from '../../theme';

export const PillStyled = styled('span', {
  display: 'inline-flex',
  color: '$gray100',
  fontSize: '8px !important',
  lineHeight: 1,
  textTransform: 'uppercase',
  padding: 3,
  border: '1px solid $gray015',
  borderRadius: 2,
});

export const Pill = ({ copy }: { copy: string }) => {
  return <PillStyled>{copy}</PillStyled>;
};
