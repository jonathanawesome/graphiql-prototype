import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const Name = styled('span', {
  color: '$gray100',
  fontSize: '$body',
  fontWeight: '$semiBold',
});

export const RootOperationTypeStyled = styled('div', {
  marginBottom: 16,

  '&::after': {
    content: '',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: '100%',
    background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, $appBackground 100%)',
  },
});
