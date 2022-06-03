import { SidebarDialog, useGraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

/** components */
import { GraphQLIcon } from '../GraphQLIcon';

/** styles */
import { Flex, Label, RadioGroup, RadioGroupIndicator, RadioGroupRadio } from './styles';

type ApiUrls = Record<string, { aboutUrl: string; apiUrl: string }>;

const apiUrls: ApiUrls = {
  [`Rick and Morty`]: {
    aboutUrl: 'https://rickandmortyapi.com/about',
    apiUrl: 'https://rickandmortyapi.com/graphql',
  },
  [`SpaceX`]: {
    aboutUrl: 'https://spacex.land/',
    apiUrl: 'https://api.spacex.land/graphql',
  },
  [`Local Dev API @ http://localhost:4000/graphql`]: {
    aboutUrl: 'http://localhost:4000/graphql', // lol
    apiUrl: 'http://localhost:4000/graphql',
  },
};

const Radio = ({
  aboutUrl,
  apiUrl,
  id,
  name,
}: {
  aboutUrl: string;
  apiUrl: string;
  id: string;
  name: string;
}) => (
  <Flex>
    <RadioGroupRadio value={apiUrl} id={id}>
      <RadioGroupIndicator />
    </RadioGroupRadio>
    <Label htmlFor={id}>
      <a href={aboutUrl} target="_blank" rel="noreferrer">
        {name}
      </a>
    </Label>
  </Flex>
);

const SchemaSelectorContent = () => {
  const handleValueChange = (value: string) => {
    const initSchema = useGraphiQL.getState().initSchema;
    if (value === 'testSchema') {
      initSchema({});
    } else {
      initSchema({ url: value });
    }
  };

  return (
    <RadioGroup
      defaultValue="testSchema"
      aria-label="Choose schema"
      onValueChange={(value) => handleValueChange(value)}
    >
      <Flex>
        <RadioGroupRadio value="testSchema" id="1">
          <RadioGroupIndicator />
        </RadioGroupRadio>
        <Label htmlFor="1">
          <a
            href="https://github.com/graphql/graphiql/blob/main/packages/graphiql/test/schema.js"
            target="_blank"
            rel="noreferrer"
          >
            Test Schema
          </a>
        </Label>
      </Flex>
      {Object.keys(apiUrls).map((x, i) => {
        const id = (i + 2).toString();
        return (
          <Radio
            key={id}
            aboutUrl={apiUrls[x].aboutUrl}
            apiUrl={apiUrls[x].apiUrl}
            id={id}
            name={x}
          />
        );
      })}
    </RadioGroup>
  );
};

export const SchemaSelector = () => {
  return (
    <SidebarDialog
      icon={<GraphQLIcon />}
      content={<SchemaSelectorContent />}
      title={`Schema Selector "Plugin"`}
    />
  );
};
