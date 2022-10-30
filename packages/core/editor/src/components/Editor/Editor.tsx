// components
import { Analyze } from '../Analyze/Analyze';
import { EditorTabs } from '../EditorTabs';
import { Operate } from '../Operate';
import { Resizer } from '@graphiql-prototype/ui-library';

// styles
import { StyledEditorGroup } from './styles';

export const Editor = () => {
  return (
    <>
      <EditorTabs />
      <StyledEditorGroup>
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
      </StyledEditorGroup>
    </>
  );
};
