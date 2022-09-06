// components
import { Analyze } from '../Analyze/Analyze';
import { Tabs } from '../Tabs';
import { Operate } from '../Operate';
import { Resizer } from '@graphiql-prototype/ui-library';

// styles
import { EditorWrap, EditorInner } from './styles';

export const GraphiQLEditor = () => {
  return (
    <EditorWrap>
      <EditorInner>
        <Tabs />
        <Resizer
          direction="horizontal"
          handleStyle="bar"
          pane1={{
            initialFlexGrowValue: 1,
            component: <Operate />,
          }}
          pane2={{
            component: <Analyze />,
          }}
        />
      </EditorInner>
    </EditorWrap>
  );
};
