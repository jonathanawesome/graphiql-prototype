import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const PanePluginContainerWrap = styled('div', {
  height: '100%',
  width: '100%',
  position: 'relative',
});

export const PanePluginContainer = styled('div', {
  height: '100%',

  variants: {
    isActive: {
      true: { opacity: 1, visibility: 'visible' },
      false: { opacity: 0, visibility: 'hidden' },
    },
  },
});
