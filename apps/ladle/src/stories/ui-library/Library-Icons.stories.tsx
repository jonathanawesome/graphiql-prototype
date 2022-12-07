import { Icon, css } from '@graphiql-prototype/ui-library';

const StyledWrap = css({
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',
  gap: 24,
});

const StyledComponent = css({
  display: 'flex',
  alignItems: 'center',
  gap: 12,

  span: {
    fontSize: '$body',
    color: '$gray100',
    width: 200,
  },
});

const StyledSVGWrap = css({
  height: 24,
  width: 24,
});

const Component = ({ icon, title }: { icon: React.ReactElement; title: string }) => {
  return (
    <div className={StyledComponent()}>
      <span>{title}</span>
      <div className={StyledSVGWrap()}>{icon}</div>
    </div>
  );
};

export const Library = () => {
  return (
    <div className={StyledWrap()}>
      <Component icon={<Icon name="Check" />} title="Check" />
      <Component icon={<Icon name="ChevronLarge" />} title="ChevronLarge" />
      <Component icon={<Icon name="ChevronSmall" />} title="ChevronSmall" />
      <Component icon={<Icon name="Close" />} title="Close" />
      <Component icon={<Icon name="Code" />} title="Code" />
      <Component icon={<Icon name="Command" />} title="Command" />
      <Component icon={<Icon name="Docs" />} title="Docs" />
      <Component icon={<Icon name="Ellipsis" />} title="Ellipsis" />
      <Component icon={<Icon name="Gear" />} title="Gear" />
      <Component icon={<Icon name="GraphQLIcon" />} title="GraphQLIcon" />
      <Component icon={<Icon name="Input" />} title="Input" />
      <Component icon={<Icon name="Play" />} title="Play" />
      <Component icon={<Icon name="Plus" />} title="Plus" />
      <Component icon={<Icon name="Prettier" />} title="Prettier" />
      <Component icon={<Icon name="SeparatorRound" />} title="SeparatorRound" />
    </div>
  );
};
