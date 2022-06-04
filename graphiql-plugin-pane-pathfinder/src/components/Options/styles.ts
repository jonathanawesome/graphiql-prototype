import { styled } from '@graphiql-v2-prototype/graphiql-v2';

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
    fontSize: '$body',
    '&:nth-of-type(1)': {
      fontWeight: '$medium',
      color: '$scale800',
    },
    '&:nth-of-type(2)': {
      color: '$scale700',
      lineHeight: 1.25,
    },
  },
});
