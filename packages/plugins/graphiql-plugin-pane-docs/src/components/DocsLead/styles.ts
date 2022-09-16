import { styled, theme } from '@graphiql-prototype/ui-library';

export const DocsLeadStyled = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: 24,
});

export const Left = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const Right = styled('div', {});

export const BackButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  // marginLeft: -4,

  '&:focus': {
    outline: `2px solid red`,
  },

  '&:hover': {
    svg: {
      path: {
        fill: theme.colors.text2,
      },
    },
    span: {
      color: theme.colors.text2,
    },
  },

  svg: {
    height: 16,
    width: 16,
    path: {
      fill: theme.colors.text3,
    },
  },

  span: {
    display: 'block',
    marginTop: 1,
    fontSize: 13,
    lineHeight: 1,
    color: theme.colors.text3,
    fontWeight: 500,
  },
});

export const CurrentTypeName = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 10,

  span: {
    '&:nth-of-type(1)': {
      fontSize: 18,
      fontWeight: 500,
      color: theme.colors.text2,
    },
    '&:nth-of-type(2)': {
      padding: '2px 4px',
      fontSize: 12,
      color: theme.colors.text2,
      borderRadius: 4,
      border: `1px solid ${theme.colors.surface3}`,
    },
  },
});
