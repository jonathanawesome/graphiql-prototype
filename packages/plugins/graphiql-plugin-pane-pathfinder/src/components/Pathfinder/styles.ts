import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledPathfinderLead = styled('div', {
  display: 'flex',
  width: '100%',
  height: theme.space[12],
  borderBottom: `1px solid ${theme.colors.surface3}`,
});

export const StyledPathfinder = styled('div', {
  position: 'relative',
  height: '100%',
  width: '100%',
  backgroundColor: theme.colors.surface1,
  color: theme.colors.text2,
});

export const StyledPathfinderContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: '100%',
  width: '100%',
  transition: 'all .1s $authenticMotion',

  // ul: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   gap: 10,
  // },

  variants: {
    dialogActive: {
      false: {
        visibility: 'visible',
        opacity: '1',
        transform: 'scale(1)',
      },
      true: {
        visibility: 'hidden',
        opacity: '0',
        transform: 'scale(0.98)',
      },
    },
  },
});

export const StyledPathfinderContent = styled('div', {
  height: '100%',
  width: '100%',
  overflowY: 'auto',
  padding: 0,
  margin: 0,
});
