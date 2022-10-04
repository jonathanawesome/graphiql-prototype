import { styled, theme } from '@graphiql-prototype/ui-library';

const StyledFlexRow = styled('div', {
  width: `100%`,
  display: 'grid',
  gridTemplateColumns: '64px 1fr',
  gap: 12,
  alignItems: 'center',
  justifyItems: `flex-end`,

  '& .name': {
    color: theme.colors.text2,
    fontSize: 12,
  },
});

export const FlexRow = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  return (
    <StyledFlexRow>
      <span className="name">{name}</span>
      {children}
    </StyledFlexRow>
  );
};
