import { useEffect, useState } from 'react';

// components
import { Control, HandleChange, Spinner } from '@graphiql-prototype/ui-library';

// hooks
import { useSchema } from '@graphiql-prototype/use-schema';

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
  StyledSubmitButton,
} from './styles';

type AvailableAPIs = Record<string, { aboutUrl: string; apiUrl: string }>;

const testSchemaName = `Official GraphiQL Test Schema`;
const customSchemaUrlInput = 'customSchemaUrlInput';
const customSchemaUrlLocalStorageKey = 'graphiql-prototype-custom-schema-url';

const availableAPIs: AvailableAPIs = {
  [testSchemaName]: {
    aboutUrl:
      'https://github.com/graphql/graphiql/blob/main/packages/graphiql/test/schema.js',
    apiUrl: testSchemaName,
  },
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
  activeRadioValue,
  value,
  id,
  copy,
}: {
  aboutUrl?: string;
  activeRadioValue: string | null;
  value: string;
  id: string;
  copy: string;
}) => (
  <RadioWrap isActive={activeRadioValue === value}>
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

export const SchemaSelector = () => {
  const { loadSchema, schema, schemaLoading, schemaUrl } = useSchema();

  const [schemaError, setSchemaError] = useState<string | null>(null);

  const [customSchemaUrl, setCustomSchemaUrl] = useState<string>('');

  const [activeRadioValue, setActiveRadioValue] = useState<string | null>(
    schemaError ? null : schemaUrl ? schemaUrl : testSchemaName
  );

  const [targetSchemaUrl, setTargetSchemaUrl] = useState<string | null>();

  // console.log('SchemaSelector', {
  //   schemaUrl,
  //   activeRadioValue,
  //   targetSchemaUrl,
  // });

  useEffect(() => {
    // pluck the last successfully-accessed schema from localstorage if it exists
    const savedCustomSchema = localStorage.getItem(customSchemaUrlLocalStorageKey);
    if (savedCustomSchema) {
      setCustomSchemaUrl(savedCustomSchema);
    }

    if (!schema || 'error' in schema) {
      // we either don't have a schema or we have a schema with an error
      // remove super simple local storage
      localStorage.removeItem(customSchemaUrlLocalStorageKey);
      setActiveRadioValue(customSchemaUrlInput);
      setSchemaError(
        'Error loading schema. Is the URL formatted correctly? Does your API require auth headers?'
      );
    } else {
      // we have a schema
      // clear any error
      setSchemaError(null);

      if (schema.getQueryType()?.name === 'Test') {
        // if we're using the test schema, set the radio value
        setActiveRadioValue(testSchemaName);
      } else {
        // we're not using the test schema, so it's either one of our public schemas or a custom schema
        if (
          Object.keys(availableAPIs)
            .map((k) => availableAPIs[k].apiUrl)
            .includes(schemaUrl as string)
        ) {
          // the current schemaUrl is one of our availableAPIs
          setActiveRadioValue(schemaUrl);
        } else {
          // we're using a custom schema
          setActiveRadioValue(customSchemaUrlInput);
          setCustomSchemaUrl(schemaUrl as string);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema]);

  useEffect(() => {
    if (targetSchemaUrl && targetSchemaUrl !== testSchemaName) {
      loadSchema({ init: true, url: targetSchemaUrl });
    } else if (targetSchemaUrl == testSchemaName) {
      loadSchema({ init: true, url: 'GraphiQL Test Schema' });
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
    // set super simple local storage
    localStorage.setItem(customSchemaUrlLocalStorageKey, customSchemaUrl);
  };

  return (
    <RadioGroup
      value={activeRadioValue || undefined}
      aria-label="Choose schema"
      onValueChange={(value) => {
        setActiveRadioValue(value);
        if (
          Object.keys(availableAPIs)
            .map((k) => availableAPIs[k].apiUrl)
            .includes(value)
        ) {
          return setTargetSchemaUrl(value);
        }
        return undefined;
      }}
    >
      <fieldset disabled={schemaLoading}>
        {Object.keys(availableAPIs).map((key, i) => {
          const id = (i + 2).toString();
          return (
            <Radio
              key={id}
              aboutUrl={availableAPIs[key].aboutUrl}
              activeRadioValue={activeRadioValue}
              copy={key}
              id={id}
              value={availableAPIs[key].apiUrl}
            />
          );
        })}
        <div>
          <Radio
            activeRadioValue={activeRadioValue}
            copy="Custom Schema Url"
            id="10"
            value={customSchemaUrlInput}
          />
          {schemaError && <Error>{schemaError}</Error>}
          {activeRadioValue === customSchemaUrlInput && (
            <CustomSchemaFormWrap>
              <Note>Global headers can be set via the settings dialog.</Note>
              <Control
                control={{
                  controlType: 'INPUT',
                  handleChange: handleCustomSchemaUrlChange,
                  name: customSchemaUrlInput,
                  placeholder: 'http://api.mydomain.com/graphql',
                  value: customSchemaUrl,
                }}
                labelCopy={`Your schema URL`}
                list={false}
              />
              <StyledSubmitButton
                onClick={(e) => {
                  customSchemaUrlInputSubmitHandler(e);
                }}
              >
                Use this schema
              </StyledSubmitButton>
            </CustomSchemaFormWrap>
          )}
        </div>
      </fieldset>
      <SpinnerWrap loading={schemaLoading}>
        <Spinner />
      </SpinnerWrap>
    </RadioGroup>
  );
};
