import { globalCss } from '@stitches/react';

export const globalStyles = globalCss({
  // begin mini reset
  '*, *:before, *:after': {
    boxSizing: 'border-box',
  },
  'html, body, #root, #ladle-root': {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  // end mini reset
  // begin global css
  button: {
    all: 'unset',
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
  'a, button': {
    '&:focus': {
      outline: '1px dotted $gray100',
      outlineOffset: -1,
    },
  },
  // end global css
  // begin set fonts
  html: {
    fontFamily: '$stack',
    fontSmooth: 'always',
    textRendering: 'optimizeLegibility',
  },
  // end set fonts
});
