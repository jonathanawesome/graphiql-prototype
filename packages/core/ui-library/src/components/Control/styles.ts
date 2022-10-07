import { styled, theme } from '../../theme';

export const StyledLabel = styled('label', {
  width: `auto`,
  whiteSpace: `nowrap`,
  display: `flex`,
  alignItems: `center`,
  gap: theme.space[2],
  padding: `0 ${theme.space[2]}`,
  border: `1px solid ${theme.colors.surface3}`,
  backgroundColor: theme.colors.surface2,
  color: theme.colors.text3,
  fontSize: theme.space[3],
});

export const StyledInput = styled('input', {
  all: `unset`,
  boxSizing: `border-box`,
  width: `100%`,
  height: 28,
  fontSize: 11,
  fontFamily: theme.fonts.mono,
  color: theme.colors.yellow_default,

  '&::placeholder': {
    color: theme.colors.text4,
  },
});

export const StyledSelectWrap = styled('div', {
  width: `100%`,
  position: `relative`,
  cursor: `pointer`,
  color: theme.colors.yellow_default,

  '&:hover': {
    svg: {
      path: {
        fill: theme.colors.text3,
      },
    },
  },

  variants: {
    isSelected: {
      false: {
        select: {
          color: theme.colors.text4,
        },
      },
    },
  },
});

export const StyledSelect = styled('select', {
  all: `unset`,
  boxSizing: `border-box`,
  display: `flex`,
  alignItems: `center`,
  width: `100%`,
  height: 28,
  color: theme.colors.yellow_default,

  fontSize: 11,
  fontFamily: theme.fonts.mono,
});

export const StyledSelectDecoration = styled('div', {
  position: `absolute`,
  right: theme.space[3],
  top: 9,
  height: 10,
  width: 10,

  svg: {
    path: {
      fill: theme.colors.text4,
    },
  },
});

export const StyledList = styled('div', {
  width: '100%',
});

export const StyledListItem = styled('div', {
  display: 'flex',

  [`& ${StyledInput}, & ${StyledSelectWrap}`]: {
    borderBottom: `transparent !important`,
  },
});

export const StyledRemoveItemButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: `inherit`,
  borderTop: `1px solid ${theme.colors.surface3}`,
  borderRight: `1px solid ${theme.colors.surface3}`,

  svg: {
    height: theme.space[3],
    width: theme.space[3],

    path: {
      fill: theme.colors.surface3,
    },
  },

  '&:hover': {
    backgroundColor: theme.colors.red_lightest,
    svg: {
      path: {
        fill: theme.colors.red_default,
      },
    },
  },
});

export const StyledAddItemButton = styled('button', {
  width: '100%',
  height: theme.space[8],
  textAlign: 'right',
  paddingRight: theme.space[3],
  color: theme.colors.text4,
  fontSize: 11,
  fontFamily: theme.fonts.mono,
  borderTop: `1px solid ${theme.colors.surface3}`,
  borderRight: `1px solid ${theme.colors.surface3}`,
  borderBottom: `1px solid ${theme.colors.surface3}`,

  '&:hover': {
    backgroundColor: theme.colors.surface2,
    color: theme.colors.text3,
  },
});

export const StyledControlWrap = styled('div', {
  display: 'flex',
  width: '100%',

  [`& ${StyledInput}, & ${StyledSelect}`]: {
    borderTop: `1px solid ${theme.colors.surface3}`,
    borderRight: `1px solid ${theme.colors.surface3}`,
    borderBottom: `1px solid ${theme.colors.surface3}`,

    '&:focus': {
      backgroundColor: theme.colors.surface2,
      // select: {
      //   backgroundColor: theme.colors.surface2,
      // },
    },
  },

  variants: {
    alignment: {
      LEFT: {
        [`& ${StyledInput}, & ${StyledSelect}`]: {
          textAlign: `left`,
          paddingLeft: theme.space[3],
        },
      },
      RIGHT: {
        [`& ${StyledInput}, & ${StyledSelect}`]: {
          textAlign: `right`,
          paddingRight: theme.space[3],
        },
        [`& ${StyledSelect}`]: {
          paddingRight: theme.space[7],
        },
      },
    },
    displayLabel: {
      false: {
        [`& ${StyledLabel}`]: {
          position: `absolute !important`,
          top: `-9999px !important`,
          left: `-9999px !important`,
        },
        [`& ${StyledInput},& ${StyledSelectWrap}`]: {
          border: `1px solid ${theme.colors.surface3}`,

          '&:focus': {
            border: `1px solid ${theme.colors.surface3}`,
          },
        },
      },
    },
    isDisabled: {
      true: {
        [`& ${StyledInput},& ${StyledSelectWrap}`]: {
          backgroundColor: theme.colors.surface3,
          opacity: 0.4,
          color: theme.colors.text2,
          cursor: `not-allowed`,
        },
      },
      false: {},
    },
  },
});
