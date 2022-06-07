import { styled } from '@graphiql-v2-prototype/graphiql-v2';

export const FieldChildren = styled('div', {
  marginLeft: 20,
});

export const IndicatorWrap = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    height: 15,
    width: 15,
  },

  variants: {
    isActive: {
      false: {
        svg: {
          transform: 'scale(0.85)',
        },
      },
    },
  },
});
