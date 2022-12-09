import { css } from '../../theme';

export const StyledDialog = css({
  backgroundColor: 'orange',
  position: 'relative',

  '& .fixed': {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate3d(-50%, -50%, 0)',
    maxWidth: 300,
    backgroundColor: 'orange',
    padding: 24,
  },
});
