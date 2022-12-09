import { css, theme } from '@graphiql-prototype/ui-library';

const StyledFlexRow = css({
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
    <div className={StyledFlexRow()}>
      <span className="name">{name}</span>
      {children}
    </div>
  );
};
