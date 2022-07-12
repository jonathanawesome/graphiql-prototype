import { styled } from '../../../theme';

export const StyledList = styled('div', {
  width: '100%',
});

export const StyledListItem = styled('div', {
  display: 'flex',
  borderBottom: '1px solid $gray015 !important',
});

export const RemoveItemButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  borderRight: '1px solid $gray010',

  svg: {
    height: 12,
    width: 12,

    path: {
      fill: '$gray015',
    },
  },

  '&:hover': {
    backgroundColor: '$error010',
    color: '$gray010',
    svg: {
      path: {
        fill: '$error100',
      },
    },
  },
});

export const AddItemButton = styled('button', {
  width: '100%',
  height: 32,
  textAlign: 'right',
  padding: '8px 8px 8px 0',
  fontSize: '$mini',
  color: '$gray100',
  fontFamily: '$mono',

  '&:hover': {
    backgroundColor: '$gray007',
  },
});
