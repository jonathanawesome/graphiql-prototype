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
  borderTop: '1px solid $scale400',
  // backgroundColor: '$scale200',
});

export const Note = styled('span', {
  display: 'flex',
  margin: 12,
  width: '100%',
  fontSize: '$body',
  fontStyle: 'italic',
  padding: '8px 16px',
  border: '1px solid $scale400',
  backgroundColor: '$scale100',
  color: '$scale700',
});
