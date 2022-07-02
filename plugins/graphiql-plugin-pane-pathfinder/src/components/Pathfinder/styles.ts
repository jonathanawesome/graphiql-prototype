import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const PathfinderWrap = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  height: '100%',
});

export const PathfinderLead = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const PathfinderContentWrap = styled('div', {
  position: 'relative',
  height: '100%',
  width: '100%',
  overflowY: 'auto',
  transition: 'all .1s $authenticMotion',

  variants: {
    overlayVisible: {
      false: {
        visibility: 'visible',
        opacity: '1',
        transform: 'scale(1)',
      },
      true: {
        visibility: 'hidden',
        opacity: '0',
        transform: 'scale(0.98)',
      },
    },
  },
});

export const PathfinderContent = styled('div', {
  position: 'absolute',
  top: 64,
  left: 0,
  height: 'calc(100% - 64px)',
  width: '100%',
  overflowX: 'hidden',
});

export const FakeSearch = styled('div', {
  backgroundColor: '$white',
  border: '1px solid $gray015',
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
