// default plugin
import { PanePluginSettings } from '@graphiql-prototype/graphiql-plugin-pane-settings';

// styles
import { StyledPanePluginContainer, StyledPanePluginContainerWrap } from './styles';

// types
import { PanePluginsArray } from '../../types';

export const PanePlugins = ({
  activePane,
  panePlugins,
}: {
  activePane: string;
  panePlugins: PanePluginsArray;
}) => {
  const activePaneContent = [...panePlugins, PanePluginSettings].find(
    (panePlugin) => panePlugin.panePluginName === activePane
  );

  // TODO
  if (!activePaneContent) {
    return <p>loading pane...</p>;
  }

  return (
    <StyledPanePluginContainerWrap>
      <StyledPanePluginContainer>
        <activePaneContent.panePluginContent />
      </StyledPanePluginContainer>
    </StyledPanePluginContainerWrap>
  );
};
