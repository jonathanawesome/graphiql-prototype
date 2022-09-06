import { styled } from '@graphiql-prototype/ui-library';

export const TabWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  border: '1px solid red',
});

export const TabButton = styled('button', {
  fontSize: '$body',
  fontWeight: '$medium',
});

export const RemoveTabButton = styled('button', {
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,

  svg: {
    width: 18,
    height: 18,
    path: {
      fill: '$text4',
    },
  },

  '&:hover': {
    backgroundColor: '$gray040',
    svg: {
      width: 12,
      height: 12,
      path: {
        fill: '$editorBackground',
      },
    },
  },
});
