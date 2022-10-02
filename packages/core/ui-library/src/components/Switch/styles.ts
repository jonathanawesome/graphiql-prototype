import { styled, theme } from '../../theme';

export const StyledSwitch = styled('div', {
  display: `flex`,
  alignItems: `center`,
  transition: `opacity .1s ease`,

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
    position: `relative`,
    transition: `background-color 0.2s`,

    span: {
      position: `absolute`,
      top: 2,
      left: 2,
      background: theme.colors.surface2,
      boxShadow: `0 0 2px 0 ${theme.colors.surface3}`,
      transition: `all 0.15s`,
    },
  },

  'input:checked + label span': {
    left: `calc(100% - 2px)`,
    transform: `translateX(-100%)`,
  },

  variants: {
    isChecked: {
      true: {},
      false: {
        '& label': {
          background: theme.colors.text3,
        },
      },
    },
    isDisabled: {
      true: {
        opacity: 0.35,
        '& label': {
          cursor: `not-allowed`,
          background: theme.colors.text3,
        },
      },
      false: {},
    },
    size: {
      LARGE: {
        '& label': {
          width: 64,
          height: 32,
          borderRadius: 32,

          ':active': {
            width: 34,
          },

          span: {
            width: 28,
            height: 28,
            borderRadius: 14,
          },
        },
      },
      MEDIUM: {
        '& label': {
          width: 48,
          height: 24,
          borderRadius: 24,

          ':active': {
            width: 26,
          },

          span: {
            width: 20,
            height: 20,
            borderRadius: 10,
          },
        },
      },
      SMALL: {
        '& label': {
          width: 38,
          height: 18,
          borderRadius: 18,

          ':active': {
            width: 18,
          },

          span: {
            top: 2,
            left: 2,
            width: 14,
            height: 14,
            borderRadius: 7,
          },
        },
      },
    },
  },
});
