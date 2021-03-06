import { styled } from '@graphiql-prototype/graphiql-ui-library';

export const VariablesWrap = styled('div', {
  // border: '1px solid LimeGreen',
});

export const VariablesEditor = styled('div', {
  variants: {
    isVisible: {
      true: {
        padding: '4px 8px 8px',
        height: 150,
        opacity: 1,
        visibility: 'visible',
      },
      false: {
        height: 0,
        opacity: 0,
        visibility: 'hidden',
      },
    },
  },
});
