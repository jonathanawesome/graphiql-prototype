import { styled } from '@stitches/react';

import * as Collapsible from '@radix-ui/react-collapsible';

export const Trigger = styled(Collapsible.Trigger, {
  display: 'flex',
  alignContent: 'center',
  gap: 6,
  cursor: 'pointer',
  userSelect: 'none',

  '& span': {
    color: `$scale800`,
    fontWeight: 600,
  },
});

export const Content = styled(Collapsible.Content, {
  position: 'relative',
  paddingLeft: 18,

  //TODO better solution for this marker line
  '&:before': {
    content: '',
    position: 'absolute',
    top: 8,
    left: 6,
    width: 1,
    height: '100%',
    backgroundColor: `$scale400`,
  },
});

export const Root = styled(Collapsible.Root, {
  //TODO due to the nested nature of the Explorer, 👇 this acts as a reset for all buttons under this dom node.
  button: {
    border: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    margin: 0,
    padding: 0,
  },
});
