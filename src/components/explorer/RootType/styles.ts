import { styled } from '@stitches/react';

export const Trigger = styled('div', {
  display: 'flex',
  alignContent: 'center',
  gap: 6,
  cursor: 'pointer',
  userSelect: 'none',

  '& span': {
    color:`$scale800`,
    fontWeight: 600,
  },
});

export const Content = styled('div', {
  position: 'relative',
  paddingLeft: 6,

  //TODO better solution for this marker line
  '&:before': {
    content: '',
    position: 'absolute',
    top: 8,
    left: 6,
    width: 1,
    height: '100%',
    backgroundColor:`$scale400`,
  },
});

export const RootStyled = styled('div', {
  //TODO due to the nested nature of the Explorer, 👇 this acts as a reset for all buttons under this dom node.
  button: {
    border: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    margin: 0,
    padding: 0,
  },
});
