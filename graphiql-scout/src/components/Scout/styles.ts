import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const TabButton = styled('button', {
  fontSize: '$mini',
  '&:disabled': {
    // backgroundColor: 'red',
    cursor: 'not-allowed',
  },

  variants: {
    isActive: {
      true: {
        backgroundColor: 'Lime',
      },
    },
  },
});

export const TabButtonRow = styled('div', {
  display: 'flex',
  gap: 12,
});

export const ScoutInner = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  padding: 8,
  backgroundColor: '#EAEDF1',
  borderRadius: 20,
});

export const ScoutWrap = styled('div', {
  height: '100%',
  width: '100%',
  padding: 16,
  overflow: 'hidden',
});
