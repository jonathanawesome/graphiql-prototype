import { styled } from '@graphiql-prototype/graphiql-ui-library';

export const GlobalHeadersStyled = styled('div', {});

export const AddNewHeaderButton = styled('button', {
  backgroundColor: '$gray010',
  border: '1px solid transparent',
  color: '$gray100',
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  borderRadius: 4,
  fontSize: '$body',
  fontWeight: '$medium',
  placeSelf: 'flex-start',

  '&:hover': {
    backgroundColor: '$gray015',
    border: '1px solid $gray015',
  },
});
