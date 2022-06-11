import { useEffect, useState } from 'react';

/** hooks */
import { useGraphiQLEditor } from '@graphiql-v2-prototype/graphiql-editor';

/** styles */
import {
  Note,
  RadioWrap,
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupRadio,
} from './styles';

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
  <RadioWrap>
    <RadioGroupRadio value={apiUrl} id={id}>
      <RadioGroupIndicator />
    </RadioGroupRadio>
    <label htmlFor={id}>
      <span>{name}</span>
      <a href={aboutUrl} target="_blank" rel="noreferrer">
        [more info]
      </a>
    </label>
  </RadioWrap>
);

export const SchemaSelector = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { initSchema, schemaUrl, schema } = useGraphiQLEditor();

  const handleSchemaChange = (value: string) => {
    setLoading(true);
    if (value === 'testSchema') {
      initSchema({});
    } else {
      initSchema({ url: value });
    }
  };

  useEffect(() => {
    if (schema) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [schema]);

  const value = () => {
    let value: string | undefined = undefined;
    if (schemaUrl) {
      value = schemaUrl;
    } else if (!schemaUrl) {
      value = 'testSchema';
    }
    return value;
  };

  return (
    <RadioGroup
      defaultValue="testSchema"
      value={value()}
      aria-label="Choose schema"
      onValueChange={(value) => handleSchemaChange(value)}
    >
      <Note>Note: switching schemas will reset existing tab instances</Note>
      <fieldset disabled={loading}>
        {import.meta.env.MODE === 'development' && (
          <Radio
            aboutUrl="http://localhost:4000/graphql"
            apiUrl="http://localhost:4000/graphql"
            id="2"
            name="Local Dev API"
          />
        )}
        <Radio
          aboutUrl="https://github.com/graphql/graphiql/blob/main/packages/graphiql/test/schema.js"
          apiUrl="testSchema"
          id="1"
          name="Official GraphiQL Test Schema"
        />
        {Object.keys(apiUrls).map((x, i) => {
          const id = (i + 3).toString();
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
      </fieldset>
    </RadioGroup>
  );
};
