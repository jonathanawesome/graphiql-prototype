import { styled, theme } from '../../theme';

export const StyledSwitch = styled('div', {
  '& input': {
    width: 0,
    height: 0,
    visibility: `hidden`,
  },

  '& label': {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    cursor: `pointer`,
    background: theme.colors.green_default,
    width: 48,
    height: 24,
    borderRadius: 24,
    position: `relative`,
    transition: `background-color 0.2s`,

    ':active': {
      width: 26,
    },

    span: {
      position: `absolute`,
      top: 2,
      left: 2,
      width: 20,
      height: 20,
      borderRadius: `22.5px`,
      background: `#fff`,
      boxShadow: `0 0 2px 0 #0006`,
      transition: `all 0.2s`,
    },
  },

  'input:checked + label span': {
    left: `calc(100% - 2px)`,
    transform: `translateX(-100%)`,
  },

  variants: {
    checked: {
      true: {},
      false: {
        '& label': {
          background: theme.colors.text2,
        },
      },
    },
    size: {
      LARGE: {
        '& label': {
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          cursor: `pointer`,
          background: theme.colors.green_default,
          width: 64,
          height: 32,
          borderRadius: 32,
          position: `relative`,
          transition: `background-color 0.2s`,

          ':active': {
            width: 34,
          },

          span: {
            position: `absolute`,
            top: 2,
            left: 2,
            width: 28,
            height: 28,
            borderRadius: `22.5px`,
            background: `#fff`,
            boxShadow: `0 0 2px 0 #0006`,
            transition: `all 0.2s`,
          },
        },
      },
      SMALL: {},
    },
  },
});
