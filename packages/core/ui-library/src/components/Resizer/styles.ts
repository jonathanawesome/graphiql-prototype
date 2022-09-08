import { styled, theme } from '../../theme';

export const Handle = styled('div', {
  position: 'relative',
  // backgroundColor: theme.colors.surface2,
  backgroundColor: `transparent`,
  // backgroundColor: 'red',
  width: 0,
  // width: theme.space[3],
  zIndex: 1,
  flexShrink: 0,
  overflow: 'visible !important',

  '&::after': {
    // backgroundColor: 'red',

    content: '',
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 0,
    // left: `50%`,
    // top: `50%`,
    // transform: 'translate3d(-50%, -50%, 0)',
    width: theme.space[2],
    // height: 110,
    height: `100%`,
    // borderRadius: theme.space[2],
    // transition: 'background-color .15s ease',
  },
  '&:hover': {
    '&::after': {
      // backgroundColor: theme.colors.text4,
    },
  },

  variants: {
    direction: {
      VERTICAL: {
        flexDirection: 'column',
        cursor: 'row-resize',
        width: '100%',
        height: theme.space[3],

        '&::after': {
          width: 110,
          height: theme.space[1],
        },
      },
      HORIZONTAL: {
        flexDirection: 'row',
        cursor: 'col-resize',
      },
    },
    handlePosition: {
      LEFT: {
        // backgroundColor: `hsla(188, 74%, 63%, .1)`,
        left: -4,
      },
      RIGHT: {
        // backgroundColor: `hsla(133, 54%, 66%, .1)`,
        // marginRight: -12,
        left: -4,
      },
      TOP: {},
      BOTTOM: {},
    },
  },
});

export const Pane1 = styled('div', {
  display: 'flex',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 'auto',
});

export const Pane2 = styled('div', {
  display: 'flex',
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: 'auto',
});

export const Container = styled('div', {
  position: 'relative',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 'auto',

  variants: {
    direction: {
      VERTICAL: {
        flexDirection: 'column',
      },
      HORIZONTAL: {
        flexDirection: 'row',
      },
    },
  },
});
