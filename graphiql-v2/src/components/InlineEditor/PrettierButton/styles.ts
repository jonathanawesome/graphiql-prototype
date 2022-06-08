import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const PrettierButtonStyled = styled('button', {
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
