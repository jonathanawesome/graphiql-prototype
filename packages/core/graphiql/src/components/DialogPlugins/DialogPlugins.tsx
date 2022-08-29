// components
import { Dialog as DialogComponent } from '@graphiql-prototype/ui-library';

// styles
import { DialogPluginsWrap } from './styles';

// types
import { DialogPlugin, DialogPluginsArray } from './types';

const Dialog = ({ dialogPlugin }: { dialogPlugin: DialogPlugin }) => {
  return (
    <DialogComponent
      icon={<dialogPlugin.dialogPluginIcon />}
      content={<dialogPlugin.dialogPluginContent />}
      title={dialogPlugin.dialogPluginName}
    />
  );
};

export const DialogPlugins = ({
  dialogPlugins,
}: {
  dialogPlugins: DialogPluginsArray;
}) => {
  return (
    <DialogPluginsWrap>
      {dialogPlugins.map((dialogPlugin) => {
        return <Dialog key={dialogPlugin.dialogPluginName} dialogPlugin={dialogPlugin} />;
      })}
    </DialogPluginsWrap>
  );
};
