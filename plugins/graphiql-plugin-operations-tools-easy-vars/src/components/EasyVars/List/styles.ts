import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const StyledList = styled('div', {
  width: '100%',
});

export const StyledListItem = styled('div', {
  display: 'flex',
  borderBottom: '1px solid $scale400 !important',
});

export const RemoveItemButton = styled('button', {
  width: 32,
  textAlign: 'right',
  padding: '8px 8px 8px 0',
  fontSize: '$mini',
  color: '$scale700',
  borderRight: '1px solid $scale300',

  '&:hover': {
    backgroundColor: '$scale200',
    color: '$scale100',
    svg: {
      path: {
        stroke: '$accentError',
      },
    },
  },

  svg: {
    height: 12,
    width: 12,
  },
});

export const AddItemButton = styled('button', {
  width: '100%',
  height: 32,

  textAlign: 'right',
  padding: '8px 8px 8px 0',
  fontSize: '$mini',
  color: '$scale700',

  '&:hover': {
    backgroundColor: '$scale200',
    color: '$scale900',
  },
});
