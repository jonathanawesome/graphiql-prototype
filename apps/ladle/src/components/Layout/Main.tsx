import { Resizer, styled } from '@graphiql-v2-prototype/graphiql-ui-library';

import { Editor } from './Editor';
import { Pane } from './Pane';

const MainStyled = styled('main', {
  backgroundColor: 'lime',
  height: 'calc(100% - 32px)',
  width: 'calc(100% - 32px)',
  margin: 16,
  overflow: 'hidden',
});

export const Main = () => {
  return (
    <MainStyled>
      <Resizer
        direction="horizontal"
        handleStyle="bar"
        pane1={{
          initialFlexGrowValue: 1,
          component: <Pane />,
        }}
        pane2={{
          component: <Editor />,
        }}
      />
    </MainStyled>
  );
};
