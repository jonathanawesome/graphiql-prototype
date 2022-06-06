import { styled } from '../../theme';

export const TabsStyled = styled('div', {
  height: 'auto',
  width: '100%',
  overflowX: 'auto',
  overflowY: 'hidden',
  display: 'flex',
  '& button': {
    padding: 8,
    margin: 8,
  },
});
