import { keyframes, styled } from '../../theme';

export const spinner = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

export const SpinnerStyled = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,

  div: {
    display: 'block',
    width: 24,
    height: 24,
    border: '2px solid $gray100',
    borderTopColor: '$gray015',
    borderRadius: '50%',
    animation: `${spinner} 0.75s ease-in-out infinite`,
  },
});
