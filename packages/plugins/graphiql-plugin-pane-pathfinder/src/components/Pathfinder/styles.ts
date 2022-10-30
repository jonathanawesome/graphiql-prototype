import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledPathfinder = styled('div', {
  position: 'relative',
  height: '100%',
  width: '100%',
  backgroundColor: theme.colors.surface1,
  color: theme.colors.text2,
  // paddingLeft: theme.space[5],
  // paddingRight: theme.space[5],
  padding: theme.space[5],
});

export const StyledPathfinderLead = styled('div', {
  position: 'relative',
  // height: theme.space[12],
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,
  fontSize: 18,
  // fontWeight: 600,
  paddingBottom: theme.space[4],
  marginBottom: theme.space[3],
  hairlineB: theme.colors.surface3,
});

export const StyledPathfinderContent = styled('div', {
  height: `calc(100% - ${theme.space[10]})`,
  width: '100%',
  padding: 0,
  margin: 0,
});

export const StyledContainer = styled('div', {
  margin: 24,
});
