/** components */
import { Navigation } from '../index';
import { Pathfinder } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';
import { GraphiQLEditor } from '@graphiql-v2-prototype/graphiql-editor';
import { HorizontallyResizableContainer } from '@graphiql-v2-prototype/graphiql-ui-library';

/** styles */
import { GraphiQLStyled } from './styles';

type GraphiQLProps = {
  //TODO complete "plugin" props APIs
  panePlugins?: React.ReactElement[];
  sidebarPlugins?: React.ReactElement[];
};

export const GraphiQL = ({ panePlugins, sidebarPlugins }: GraphiQLProps) => {
  return (
    <GraphiQLStyled>
      <HorizontallyResizableContainer
        leftPane={{
          component: (
            <>
              <Navigation sidebarPlugins={sidebarPlugins} />
              {panePlugins && panePlugins.map((s) => <div key={s?.toString()}>{s}</div>)}
              <Pathfinder />
            </>
          ),
          initialWidthPercent: 40,
        }}
        rightPane={{
          component: <GraphiQLEditor />,
          initialWidthPercent: 60,
        }}
      />
    </GraphiQLStyled>
  );
};
