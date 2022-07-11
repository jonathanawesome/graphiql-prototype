import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const OperationActionsWrap = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: 40,
  minWidth: 40,
});

export const PlayButton = styled('button', {
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  margin: 0,
  padding: 0,
  width: 'min-content',
  display: 'flex',

  '& svg': {
    height: 40,
    width: 40,
    path: {
      '&:nth-of-type(1)': {
        fill: '$primary100',
      },
      '&:nth-of-type(2)': {
        fill: '$white',
      },
    },
  },

  '&:hover': {
    opacity: 0.8,
  },
});

export const PrettierButton = styled('button', {
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  margin: 0,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',

  '& svg': {
    height: 24,
    width: 24,

    path: {
      fill: '$gray040',
    },
  },

  '&:hover': {
    '& svg': {
      path: {
        fill: '$gray060',
      },
    },
  },
});
