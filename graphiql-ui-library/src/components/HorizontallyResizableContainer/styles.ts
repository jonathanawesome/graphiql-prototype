import { styled } from '../../theme';

export const Handle = styled('div', {
  cursor: 'col-resize',
  height: 80,
  width: 4,
  backgroundColor: '#C9CFD7',
  borderRadius: 4,
  position: 'absolute',
  zIndex: 1,
  left: 8,
  top: '50%',
  transform: 'translateY(-50%)',

  '&:hover': {
    backgroundColor: 'red',
  },
});

export const Left = styled('div', {
  height: '100%',
  width: '50%',
  display: 'flex',
});

export const Right = styled('div', {
  position: 'relative',
  height: '100%',
  minWidth: '20%',
  flex: 1,
});

export const Container = styled('div', {
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
});
