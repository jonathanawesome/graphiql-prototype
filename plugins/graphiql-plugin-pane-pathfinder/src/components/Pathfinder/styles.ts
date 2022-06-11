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
    color: '$scale800',
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
});

export const FakeSearch = styled('div', {
  backgroundColor: '$scale200',
  borderRadius: 8,
  padding: 12,
  gap: 12,
  display: 'flex',
  alignItems: 'center',
  cursor: 'not-allowed',
  span: {
    fontSize: '$body',
    color: '$scale700',
  },

  svg: {
    height: 16,
    width: 16,
  },
});
