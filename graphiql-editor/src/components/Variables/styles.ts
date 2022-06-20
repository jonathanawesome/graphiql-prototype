import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const EasyVarsWrap = styled('div', {
  padding: '4px 16px 8px',
});

export const VariablesWrap = styled('div', {
  // border: '1px solid LimeGreen',
});

export const VariablesEditor = styled('div', {
  variants: {
    isVisible: {
      true: {
        padding: '4px 16px 8px',
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

export const EditorOptionWrap = styled('div', {
  padding: '8px 16px',
  borderTop: '1px solid $gray015',
  backgroundColor: '$gray007',
  color: '$gray015',
});

export const Note = styled('span', {
  display: 'flex',
  margin: '0px 12px 12px 12px',
  fontSize: '$mini',
  fontStyle: 'italic',
  color: '$warning100',
});
