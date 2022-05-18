import { globalCss } from '@stitches/react';

export const globalStyles = globalCss({
  // begin mini reset
  '*, *:before, *:after': {
    boxSizing: 'border-box',
  },
  'html, body': {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  // end mini reset
  // begin global css
  svg: {
    path: {
      transition: `all .15s ease-in-out`,
    },
  },
  // end global css
  // begin fix for ladle's full screen mode
  '#ladle-root': {
    height: '100%',
  },
  // end fix for ladle's full screen mode
  // begin set fonts
  html: {
    fontFamily: '$stack',
    fontSmooth: 'always',
    textRendering: 'optimizeLegibility',
  },
  // end set fonts
});
