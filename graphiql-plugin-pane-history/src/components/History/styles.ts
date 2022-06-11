import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const HistoryWrap = styled('div', {
  height: '100%',
});

export const HistoryLead = styled('div', {
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

export const HistoryContent = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  overflowX: 'hidden',
});
