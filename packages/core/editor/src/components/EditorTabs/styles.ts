import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledEditorTabs = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.colors.surface3}`,
});

export const StyledAddTabButton = styled('button', {
  userSelect: 'none',
  width: 32,
  height: 32,
  marginLeft: 4,
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 2,

  svg: {
    width: 11,
    height: 11,
    path: {
      transition: 'fill .15s ease',
      fill: theme.colors.text4,
    },
  },

  '&:hover': {
    svg: {
      path: {
        fill: theme.colors.text3,
      },
    },
  },
});

export const TabWrap = styled('div', {
  position: 'relative',
  backgroundColor: theme.colors.surface1,

  '&:hover': {
    backgroundColor: theme.colors.surface2,
  },

  variants: {
    isActive: {
      true: {
        '&:after': {
          content: '',
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 2,
          width: '100%',
          backgroundColor: theme.colors.text1,
        },
      },
    },
  },
});

export const TabButton = styled('button', {
  all: 'reset',
  cursor: 'pointer',
  fontSize: theme.fontSizes.body,
  lineHeight: theme.fontSizes.body,
  paddingLeft: theme.space[3],
  paddingRight: theme.space[3],
  height: theme.space[10],
  color: theme.colors.text2,

  variants: {
    hasRemoveTabButton: {
      true: {
        paddingRight: theme.space[9],
      },
    },
  },
});

export const StyledRemoveTabButton = styled('button', {
  all: 'reset',
  position: 'absolute',
  top: theme.space[2],
  right: theme.space[2],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.space[6],
  height: theme.space[6],

  svg: {
    width: theme.space[3],
    height: theme.space[3],
    path: {
      fill: theme.colors.text3,
    },
  },

  '&:hover': {
    backgroundColor: theme.colors.surface3,

    svg: {
      width: theme.space[3],
      height: theme.space[3],
      path: {
        fill: theme.colors.text1,
      },
    },
  },
});
