import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const HistoryWrap = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 34,
  paddingTop: 14,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 32,
  height: '100%',
});

export const HistoryLead = styled('div', {
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

export const HistoryContentWrap = styled('div', {
  position: 'relative',
  height: '100%',
  width: '100%',
  overflowY: 'auto',
});

export const HistoryContent = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  overflowX: 'hidden',
});
