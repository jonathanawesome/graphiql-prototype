import { styled } from '../../theme';

export const Handle = styled('div', {
  position: 'relative',

  variants: {
    direction: {
      vertical: {
        flexDirection: 'column',
        cursor: 'row-resize',
      },
      horizontal: {
        flexDirection: 'row',
        cursor: 'col-resize',
      },
    },
    handleStyle: {
      bar: {
        width: 12,
        '&::after': {
          content: '',
          position: 'absolute',
          zIndex: 1,
          left: '50%',
          top: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
          width: 4,
          height: 110,
          borderRadius: 4,
          transition: 'background-color .15s ease',
        },
        '&:hover': {
          '&::after': {
            backgroundColor: '$scale600',
          },
        },
      },
      ghost: {
        width: 0,
        '&::after': {
          content: '',
          position: 'absolute',
          zIndex: 1,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 12,
          height: '100%',
        },
      },
    },
  },
  compoundVariants: [
    {
      direction: 'vertical',
      handleStyle: 'bar',
      css: {
        width: '100%',
        height: 12,

        '&::after': {
          width: 110,
          height: 4,
        },
      },
    },
    {
      direction: 'vertical',
      handleStyle: 'ghost',
      css: {
        height: 0,
        width: '100%',

        '&::after': {
          top: '50%',
          left: 'initial',
          transform: 'translateY(-50%)',
          height: 12,
          width: '100%',
        },
      },
    },
  ],
});

export const Pane1 = styled('div', {
  height: '100%',
  flex: '1 1 0%',
});

export const Pane2 = styled('div', {
  height: '100%',
  flex: '1 1 0%',
});

export const Container = styled('div', {
  height: '100%',
  width: '100%',
  display: 'flex',
  overflow: 'hidden',

  variants: {
    direction: {
      vertical: {
        flexDirection: 'column',
      },
      horizontal: {
        flexDirection: 'row',
      },
    },
  },
});
