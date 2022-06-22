import { styled } from '../../theme';

export const PillStyled = styled('span', {
  display: 'inline-flex',
  color: '$gray040',
  fontSize: '8px !important',
  lineHeight: 1,
  textTransform: 'uppercase',
  padding: 3,
  border: '1px solid $gray010',
  borderRadius: 2,
});

export const Pill = ({ copy }: { copy: string }) => {
  return <PillStyled>{copy}</PillStyled>;
};
