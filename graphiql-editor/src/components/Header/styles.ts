import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const GraphiQLLink = styled('div', {
  a: {
    color: '$gray040',
    fontSize: '$body',
    fontWeight: '$semiBold',
    textDecoration: 'none',

    '&:hover': {
      color: '$gray060',
    },
  },
});

export const TabList = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  marginLeft: 4,
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
});

export const AddTabButton = styled('button', {
  userSelect: 'none',
  marginLeft: 12,

  svg: {
    width: 11,
    height: 11,
    path: {
      transition: 'fill .15s ease',
      fill: '$gray040',
    },
  },

  '&:hover': {
    svg: {
      path: {
        fill: '$gray100',
      },
    },
  },
});
