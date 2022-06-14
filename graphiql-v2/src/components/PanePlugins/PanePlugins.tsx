/** styles */
import { PanePluginContainer, PanePluginContainerWrap } from './styles';
import { PanePluginsArray } from './types';

export const PanePlugins = ({
  activePane,
  panePlugins,
}: {
  activePane: string;
  panePlugins: PanePluginsArray;
}) => {
  const activePaneContent = panePlugins.find(
    (panePlugin) => panePlugin.panePluginName === activePane
  );

  // TODO
  if (!activePaneContent) {
    return <p>loading pane...</p>;
  }

  return (
    <PanePluginContainerWrap>
      <PanePluginContainer>
        <activePaneContent.panePluginContent />
      </PanePluginContainer>
    </PanePluginContainerWrap>
  );
};
