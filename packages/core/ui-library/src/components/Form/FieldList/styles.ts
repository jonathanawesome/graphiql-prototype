import { styled, theme } from '../../../theme';

export const StyledList = styled('div', {
  width: '100%',
});

export const StyledListItem = styled('div', {
  display: 'flex',
  borderBottom: `1px solid ${theme.colors.surface3} !important`,
});

export const RemoveItemButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
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

export const AddItemButton = styled('button', {
  width: '100%',
  height: 32,
  textAlign: 'right',
  padding: '8px 8px 8px 0',
  color: theme.colors.text2,
  fontFamily: theme.fonts.mono,
  fontSize: 12,

  '&:hover': {
    backgroundColor: theme.colors.surface3,
  },
});
