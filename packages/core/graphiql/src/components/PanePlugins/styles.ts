import { styled } from '@graphiql-prototype/ui-library';

export const StyledPanePluginContainerWrap = styled('div', {
  height: '100%',
  width: '100%',
  position: 'relative',
});

export const StyledPanePluginContainer = styled('div', {
  height: '100%',

  variants: {
    isActive: {
      true: { opacity: 1, visibility: 'visible' },
      false: { opacity: 0, visibility: 'hidden' },
    },
  },
});
