// components
import { Analyze } from '../Analyze/Analyze';
import { EditorTabs } from '../EditorTabs';
import { Operate } from '../Operate';
import { Resizer } from '@graphiql-prototype/ui-library';

export const Workspace = () => {
  return (
    <>
      <EditorTabs />
      <Resizer
        direction="HORIZONTAL"
        handlePosition="LEFT"
        pane1={{
          component: <Operate />,
        }}
        pane2={{
          component: <Analyze />,
          initialWidthPercentage: 50,
        }}
      />
    </>
  );
};
