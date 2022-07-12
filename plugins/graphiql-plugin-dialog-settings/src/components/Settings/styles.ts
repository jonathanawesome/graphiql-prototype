import { styled } from '@graphiql-prototype/graphiql-ui-library';

export const StyledSettingsDialogContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  padding: '12px 0',
});

export const SettingsItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  paddingBottom: 16,
  borderBottom: '1px solid $gray015',
});

export const SettingsItemLead = styled('div', {
  span: {
    display: 'block',
    fontSize: '$body',
    fontWeight: '$semiBold',
    color: '$gray100',
    marginBottom: 4,
  },

  p: {
    display: 'block',
    fontSize: '$body',
    fontWeight: '$regular',
    lineHeight: 1.5,
    color: '$gray060',
    margin: 0,
  },
});
