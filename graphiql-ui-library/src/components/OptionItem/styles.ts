import { styled } from '../../theme';

export const OptionsContentStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

export const OptionRowStyled = styled('div', {
  display: 'flex',
  gap: 24,
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const OptionRowDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,

  '& span': {
    '&:nth-of-type(1)': {
      fontSize: 12,
      fontWeight: '$medium',
      color: '$scale800',
    },
    '&:nth-of-type(2)': {
      fontSize: 11,
      color: '$scale700',
      lineHeight: 1.25,
    },
  },
});
