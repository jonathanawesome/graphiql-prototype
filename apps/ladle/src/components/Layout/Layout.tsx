import { styled } from '@graphiql-prototype/graphiql-ui-library';

import { Main } from './Main';
import { NavContainer } from './NavContainer';

const AppWrap = styled('div', {
  backgroundColor: '$appBackground',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  display: 'grid',
  gridTemplateColumns: '60px 1fr',
});

export const Layout = () => {
  return (
    <AppWrap>
      <NavContainer />
      <Main />
    </AppWrap>
  );
};
