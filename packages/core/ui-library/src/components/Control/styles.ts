import { styled, theme } from '../../theme';

export const StyledControlWrap = styled('div', {
  display: 'flex',
  width: '100%',
  // border: `1px solid ${theme.colors.surface3}`,
  // backgroundColor: 'orange',
});

export const StyledLabel = styled('label', {
  width: `auto`,
  whiteSpace: `nowrap`,
  display: `flex`,
  alignItems: `center`,
  gap: 8,
  padding: `0 ${theme.space[2]}`,
  border: `1px solid ${theme.colors.surface3}`,
  backgroundColor: theme.colors.surface2,
  color: theme.colors.text3,
  fontSize: 12,
});

export const StyledInput = styled('input', {
  all: `unset`,
  boxSizing: `border-box`,
  width: `100%`,
  height: 28,
  color: theme.colors.text3,
  textAlign: `right`,
  fontSize: 11,
  fontFamily: theme.fonts.mono,
  paddingRight: theme.space[3],
  borderTop: `1px solid ${theme.colors.surface3}`,
  borderRight: `1px solid ${theme.colors.surface3}`,
  borderBottom: `1px solid ${theme.colors.surface3}`,

  variants: {
    variant: {
      INPUT_FIELD: {
        color: theme.colors.yellow_default,
      },
      ARGUMENT: {
        color: theme.colors.yellow_default,
      },
    },
  },
});

export const StyledSelectWrap = styled('div', {
  width: `100%`,
  position: `relative`,
  borderTop: `1px solid ${theme.colors.surface3}`,
  borderRight: `1px solid ${theme.colors.surface3}`,
  borderBottom: `1px solid ${theme.colors.surface3}`,
  cursor: `pointer`,

  '&:hover': {
    svg: {
      path: {
        fill: theme.colors.text3,
      },
    },
  },

  variants: {
    variant: {
      INPUT_FIELD: {
        color: theme.colors.yellow_default,
      },
      ARGUMENT: {
        color: theme.colors.yellow_default,
      },
    },
    isSelected: {
      true: {
        select: {
          color: theme.colors.yellow_default,
        },
      },
    },
  },

  select: {
    all: `unset`,
    boxSizing: `border-box`,
    display: `flex`,
    alignItems: `center`,
    width: `100%`,
    height: 28,
    color: theme.colors.text4,
    textAlign: `right`,
    fontSize: 11,
    fontFamily: theme.fonts.mono,
    paddingRight: theme.space[8],
  },
});

export const StyledSelectDecoration = styled('div', {
  position: `absolute`,
  right: 12,
  top: 9,
  height: 10,
  width: 10,
  // backgroundColor: 'orange',
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
    borderBottom: `transparent`,
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
    height: 12,
    width: 12,

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
  height: 32,
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
