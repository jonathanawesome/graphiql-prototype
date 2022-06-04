import { styled } from '@graphiql-v2-prototype/graphiql-v2';

export const InputFields = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  // TODO needs design
  borderLeft: '1px solid $accentArgument',
  paddingLeft: 16,
  marginTop: 12,
  marginLeft: -14,
});
