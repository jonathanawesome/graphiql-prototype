import { styled, Gear, Dialog } from '@graphiql-v2-prototype/graphiql-ui-library';

const StyledSettingsDialogContent = styled('div', {
  fontSize: 10,
});

export const Settings = () => {
  return (
    <Dialog
      icon={<Gear />}
      content={
        <StyledSettingsDialogContent>
          There's nothing here except an example of a sidebar dialog. 👈 Try the 🔀 icon.
        </StyledSettingsDialogContent>
      }
      title="Settings"
    />
  );
};
