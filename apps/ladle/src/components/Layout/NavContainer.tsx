import { GraphQLIcon, css } from '@graphiql-prototype/ui-library';

import { VisuallyHidden } from './VisuallyHidden';

const StyledNavContainer = css({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRight: '1px solid $gray015',
});

const StyledNav = css({
  padding: '24px 0',

  ul: {
    all: 'unset',
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
});

const StyledNavButton = css({
  height: 32,
  width: 32,
  padding: 4,

  '&:hover': {
    svg: {
      path: {
        fill: '$primary100',
      },
    },
  },
});

export const NavContainer = () => {
  return (
    <div className={StyledNavContainer()}>
      <nav aria-labelledby="plugins-navigation" className={StyledNav()}>
        <span className={VisuallyHidden()}>
          <h2 id="plugins-navigation">Plugins navigation</h2>
        </span>
        <ul>
          <li>
            <button className={StyledNavButton()}>
              <GraphQLIcon />
            </button>
          </li>
          <li>
            <button className={StyledNavButton()}>
              <GraphQLIcon />
            </button>
          </li>
          <li>
            <button className={StyledNavButton()}>
              <GraphQLIcon />
            </button>
          </li>
        </ul>
      </nav>
      <nav aria-labelledby="dialogs-navigation" className={StyledNav()}>
        <span className={VisuallyHidden()}>
          <h2 id="dialogs-navigation">Dialogs navigation</h2>
        </span>
        <ul>
          <li>
            <button className={StyledNavButton()}>
              <GraphQLIcon />
            </button>
          </li>
          <li>
            <button className={StyledNavButton()}>
              <GraphQLIcon />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
