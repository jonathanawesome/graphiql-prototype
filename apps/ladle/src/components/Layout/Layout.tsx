import { css } from '@graphiql-prototype/ui-library';

import { Main } from './Main';
import { NavContainer } from './NavContainer';

const StyledAppWrap = css({
  backgroundColor: '$appBackground',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  display: 'grid',
  gridTemplateColumns: '60px 1fr',
});

export const Layout = () => {
  return (
    <div className={StyledAppWrap()}>
      <NavContainer />
      <Main />
    </div>
  );
};
