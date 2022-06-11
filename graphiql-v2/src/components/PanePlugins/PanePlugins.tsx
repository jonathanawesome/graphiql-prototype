/** styles */
import { PanePluginContainer, PanePluginContainerWrap } from './styles';
import { PanePluginsArray } from './types';

export const PanePlugins = ({ panePlugins }: { panePlugins: PanePluginsArray }) => {
  return (
    <PanePluginContainerWrap>
      {/* <PanePluginContainer>home</PanePluginContainer> */}
      {panePlugins?.map((panePlugin) => (
        <PanePluginContainer key={panePlugin.panePluginName}>
          {panePlugin.panePluginContent}
        </PanePluginContainer>
      ))}
    </PanePluginContainerWrap>
  );
};
