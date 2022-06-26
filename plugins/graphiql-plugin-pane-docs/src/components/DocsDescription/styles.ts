import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const DocsDescriptionStyled = styled('dl', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
});

export const DT = styled('dt', {
  display: 'flex',
  alignItems: 'center',
  fontSize: 10,
  fontWeight: 600,
  color: '$gray060',
  letterSpacing: 0.5,
  textTransform: 'uppercase',
});

export const DD = styled('dd', {
  margin: 0,
  p: {
    margin: 0,
    padding: 0,
    fontSize: 13,
    lineHeight: 1.4,
    color: '$gray100',
  },

  code: {
    fontSize: 12,
    backgroundColor: '$gray007',
    border: '1px solid $gray010',
    borderRadius: 2,
    padding: '1px 2px',
  },
});
