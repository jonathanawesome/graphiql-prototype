import { useEffect, useState } from 'react';

// hooks
import { useGraphiQLSchema } from '@graphiql-v2-prototype/graphiql-editor';

// styles
import {
  CustomSchemaFormWrap,
  Error,
  Note,
  RadioWrap,
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupRadio,
  SpinnerWrap,
} from './styles';
import { Form, HandleChange, Spinner } from '@graphiql-v2-prototype/graphiql-ui-library';

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
  [`PokeAPI`]: {
    aboutUrl: 'https://pokeapi.co/docs/graphql',
    apiUrl: 'https://beta.pokeapi.co/graphql/v1beta',
  },
};

const Radio = ({
  aboutUrl,
  value,
  id,
  copy,
}: {
  aboutUrl?: string;
  value: string;
  id: string;
  copy: string;
}) => (
  <RadioWrap>
    <RadioGroupRadio value={value} id={id}>
      <RadioGroupIndicator />
    </RadioGroupRadio>
    <label htmlFor={id}>
      <span>{copy}</span>
      {aboutUrl && (
        <a href={aboutUrl} target="_blank" rel="noreferrer">
          [more info]
        </a>
      )}
    </label>
  </RadioWrap>
);

const customSchemaUrlInput = 'customSchemaUrlInput';

export const SchemaSelector = () => {
  const { initSchema, schema, schemaLoading, schemaUrl } = useGraphiQLSchema();

  const [schemaError, setSchemaError] = useState<string | null>(null);

  const [customSchemaUrl, setCustomSchemaUrl] = useState<string>('');

  const [radioValue, setRadioValue] = useState<string>(
    schemaUrl ? schemaUrl : 'testSchema'
  );

  const [targetSchemaUrl, setTargetSchemaUrl] = useState<string>('');

  useEffect(() => {
    if (schema && 'error' in schema) {
      setSchemaError(
        'Error loading schema. Is the URL formatted correctly? Does your API require auth headers?'
      );
    } else {
      setSchemaError(null);
    }
  }, [schema]);

  useEffect(() => {
    // console.log('targetSchemaUrl', { targetSchemaUrl, schemaUrl });
    if (targetSchemaUrl === 'testSchema') {
      initSchema({});
    } else if (targetSchemaUrl.length > 0) {
      const name = Object.keys(apiUrls).find(
        (k) => apiUrls[k].apiUrl === targetSchemaUrl
      );
      initSchema({ name: name || targetSchemaUrl, url: targetSchemaUrl });
    }
    if (!schemaUrl) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetSchemaUrl]);

  const handleCustomSchemaUrlChange = ({ value }: HandleChange) => {
    setCustomSchemaUrl(value as string);
  };

  const customSchemaUrlInputSubmitHandler = (
    e: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setTargetSchemaUrl(customSchemaUrl);
  };

  return (
    <RadioGroup
      value={radioValue}
      aria-label="Choose schema"
      onValueChange={(value) => {
        // console.log('value', { value });
        setRadioValue(value);
        if (value === 'testSchema') {
          return setTargetSchemaUrl('testSchema');
        }
        if (
          Object.keys(apiUrls)
            .map((k) => apiUrls[k].apiUrl)
            .includes(value)
        ) {
          return setTargetSchemaUrl(value);
        }
        return undefined;
      }}
    >
      <fieldset disabled={schemaLoading}>
        <Radio
          aboutUrl="https://github.com/graphql/graphiql/blob/main/packages/graphiql/test/schema.js"
          value="testSchema"
          id="1"
          copy="Official GraphiQL Test Schema"
        />
        <div>
          <Radio value={customSchemaUrlInput} id="2" copy="Custom Schema Url" />
          {schemaError && <Error>{schemaError}</Error>}
          {radioValue === customSchemaUrlInput && (
            <CustomSchemaFormWrap>
              <Note>Global headers can be set via the settings dialog.</Note>
              <Form
                formType={{
                  type: 'STATIC',
                  submitHandler: customSchemaUrlInputSubmitHandler,
                  buttonCopy: 'Use this schema',
                }}
                formControls={[
                  {
                    control: {
                      currentValue: customSchemaUrl,
                      handleChange: handleCustomSchemaUrlChange,
                      name: customSchemaUrlInput,
                      placeholder: 'http://api.mydomain.com/graphql',
                    },
                    label: `Your schema URL`,
                  },
                ]}
                loading={schemaLoading}
              />
            </CustomSchemaFormWrap>
          )}
        </div>
        {Object.keys(apiUrls).map((x, i) => {
          const id = (i + 5).toString();
          return (
            <Radio
              key={id}
              aboutUrl={apiUrls[x].aboutUrl}
              value={apiUrls[x].apiUrl}
              id={id}
              copy={x}
            />
          );
        })}
      </fieldset>
      <SpinnerWrap loading={schemaLoading}>
        <Spinner />
      </SpinnerWrap>
    </RadioGroup>
  );
};
