import { styled, theme } from '@graphiql-prototype/ui-library';

export const DescriptionStyled = styled('dl', {
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
  color: theme.colors.text3,
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
    color: theme.colors.text2,
  },

  code: {
    fontSize: 12,
    backgroundColor: theme.colors.surface3,
    // border: `1px solid ${theme.colors.}`,
    borderRadius: 2,
    padding: '1px 2px',
  },
});
