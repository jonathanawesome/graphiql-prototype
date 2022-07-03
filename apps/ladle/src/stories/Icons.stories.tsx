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
  styled,
} from '@graphiql-v2-prototype/graphiql-ui-library';

const Wrap = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',
  gap: 24,
});

const ComponentStyled = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 12,

  span: {
    fontSize: '$body',
    color: '$gray100',
    width: 200,
  },
});

const SVGWrap = styled('div', {
  height: 24,
  width: 24,
});

const Component = ({ icon, title }: { icon: React.ReactElement; title: string }) => {
  return (
    <ComponentStyled>
      <span>{title}</span>
      <SVGWrap>{icon}</SVGWrap>
    </ComponentStyled>
  );
};

export const Library = () => {
  return (
    <Wrap>
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
    </Wrap>
  );
};
