import { Resizer, css } from '@graphiql-prototype/ui-library';

import { Editor } from './Editor';
import { Pane } from './Pane';

const StyledMain = css({
  backgroundColor: 'lime',
  height: 'calc(100% - 32px)',
  width: 'calc(100% - 32px)',
  margin: 16,
  overflow: 'hidden',
});

export const Main = () => {
  return (
    <main className={StyledMain()}>
      <Resizer
        direction="HORIZONTAL"
        handlePosition="RIGHT"
        pane1={{
          component: <Pane />,
        }}
        pane2={{
          component: <Editor />,
          initialWidthPercentage: 70,
        }}
      />
    </main>
  );
};
