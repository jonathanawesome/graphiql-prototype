import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const PathfinderWrap = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 34,
  paddingTop: 14,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 32,
  height: '100%',
});

export const PathfinderLead = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  h2: {
    fontSize: '$display',
    fontWeight: '$semiBold',
    color: '$gray100',
    margin: 0,
    padding: 0,
  },
});

export const PathfinderContentWrap = styled('div', {
  position: 'relative',
  height: '100%',
  width: '100%',
  overflowY: 'auto',
});

export const PathfinderContent = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  overflowX: 'hidden',
});

export const ContainRight = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginLeft: 'auto',
  marginRight: 10,
});

export const FakeSearch = styled('div', {
  backgroundColor: '$gray007',
  borderRadius: 8,
  padding: 12,
  gap: 24,
  display: 'flex',
  alignItems: 'center',
  cursor: 'not-allowed',

  div: {
    display: 'flex',
    alignItems: 'center',

    svg: {
      height: 14,
      width: 14,
    },

    '&:nth-of-type(1)': {
      gap: 6,
      span: {
        fontSize: '$body',
        color: '$gray060',
      },
      svg: {
        padding: 1,
        path: {
          fill: '$gray060',
        },
      },
    },
    '&:nth-of-type(2)': {
      gap: 1,
      span: {
        fontSize: '$body',
        color: '$gray040',
      },
      svg: {
        path: {
          fill: '$gray040',
        },
      },
    },
  },
});
