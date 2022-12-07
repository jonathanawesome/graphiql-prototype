import {
  Check,
  ChevronLarge,
  ChevronSmall,
  Close,
  Code,
  Command,
  Docs,
  Ellipsis,
  Gear,
  GraphQLIcon,
  Input,
  Play,
  Plus,
  Prettier,
  SeparatorRound,
  css,
} from '@graphiql-prototype/ui-library';

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
      <Component icon={<Check />} title="Check" />
      <Component icon={<ChevronLarge />} title="ChevronLarge" />
      <Component icon={<ChevronSmall />} title="ChevronSmall" />
      <Component icon={<Close />} title="Close" />
      <Component icon={<Code />} title="Code" />
      <Component icon={<Command />} title="Command" />
      <Component icon={<Docs />} title="Docs" />
      <Component icon={<Ellipsis />} title="Ellipsis" />
      <Component icon={<Gear />} title="Gear" />
      <Component icon={<GraphQLIcon />} title="GraphQLIcon" />
      <Component icon={<Input />} title="Input" />
      <Component icon={<Play />} title="Play" />
      <Component icon={<Plus />} title="Plus" />
      <Component icon={<Prettier />} title="Prettier" />
      <Component icon={<SeparatorRound />} title="SeparatorRound" />
    </div>
  );
};
