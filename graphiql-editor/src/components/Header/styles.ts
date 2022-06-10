import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const GraphiQLLink = styled('div', {
  a: {
    color: '$scale600',
    fontSize: '$body',
    fontWeight: '$semiBold',
  },
});

export const TabsRow = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  // backgroundColor: 'orange',
});

export const HeaderWrap = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'space-between',
  gap: 12,
  margin: '4px 0 12px',
  paddingRight: '16px',
  // backgroundColor: 'red',
});

export const AddTabButton = styled('button', {
  userSelect: 'none',

  svg: {
    width: 11,
    height: 11,
    path: {
      transition: 'fill .15s ease',
    },
  },

  '&:hover': {
    svg: {
      path: {
        fill: '$scale700',
      },
    },
  },
});
