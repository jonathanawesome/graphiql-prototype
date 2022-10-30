import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledEditorGroup = styled('div', {
  backgroundColor: theme.colors.surface2,
  position: `relative`,
  width: `100%`,
  height: `100%`,
  display: `flex`,
  overflow: `hidden`,
  paddingTop: theme.space[4],
  paddingLeft: theme.space[4],
});
