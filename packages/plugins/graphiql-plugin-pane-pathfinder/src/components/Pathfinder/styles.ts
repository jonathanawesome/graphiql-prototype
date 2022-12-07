import { css, theme } from '@graphiql-prototype/ui-library';

export const StyledPathfinderWrap = css({
  position: 'relative',
  height: '100%',
  width: '100%',
  backgroundColor: theme.colors.surface1,
  color: theme.colors.text2,

  '& .pathfinder-inner': {
    overflow: `hidden`,
    position: 'relative',
    height: '100%',
    width: '100%',
    transition: 'all .1s $authenticMotion',
  },

  '& .pathfinder-content': {
    height: `calc(100% - ${theme.space[10]})`,
    width: '100%',
    padding: 0,
    margin: 0,
  },

  '& .pathfinder-message-container': {
    margin: 24,
  },
});

// export const StyledPathfinderContainer = styled('div', {
//   overflow: `hidden`,
//   position: 'relative',
//   height: '100%',
//   width: '100%',
//   transition: 'all .1s $authenticMotion',

//   // variants: {
//   //   dialogActive: {
//   //     false: {
//   //       visibility: 'visible',
//   //       opacity: '1',
//   //       transform: 'scale(1)',
//   //     },
//   //     true: {
//   //       visibility: 'hidden',
//   //       opacity: '0',
//   //       transform: 'scale(0.98)',
//   //     },
//   //   },
//   // },
// });

// export const StyledPathfinderContent = styled('div', {
//   height: `calc(100% - ${theme.space[10]})`,
//   width: '100%',
//   padding: 0,
//   margin: 0,
// });

// export const StyledContainer = styled('div', {
//   margin: 24,
// });
