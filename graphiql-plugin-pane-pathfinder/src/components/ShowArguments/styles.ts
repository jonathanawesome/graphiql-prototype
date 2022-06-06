import { styled } from '@graphiql-v2-prototype/graphiql-v2';

export const StyledShowArguments = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
  height: 16,
  // marginTop: 10,

  svg: {
    height: 24,
    width: 24,
  },

  span: {
    fontWeight: '$medium',
    fontSize: 12,
    color: '$scale700',
    marginTop: -3,
  },
});
