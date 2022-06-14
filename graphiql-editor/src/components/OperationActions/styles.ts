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

  '&:hover': {
    opacity: 0.9,
  },

  '& svg': {
    height: 40,
    width: 40,
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

  '&:hover': {
    opacity: 0.9,
  },

  '& svg': {
    height: 24,
    width: 24,
  },
});
