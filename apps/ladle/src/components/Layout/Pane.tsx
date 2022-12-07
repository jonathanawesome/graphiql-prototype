import { css } from '@graphiql-prototype/ui-library';

import { Pathfinder } from './Pathfinder';

const StyledPane = css({
  border: '2px dashed red',
  height: 'calc(100% - 48px)',
  width: 'calc(100% - 48px)',
  margin: 24,
  overflowY: 'auto',
});

export const Pane = () => {
  return (
    <div className={StyledPane()}>
      <Pathfinder />
    </div>
  );
};
