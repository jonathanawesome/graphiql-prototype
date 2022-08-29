import { useState } from 'react';

// components
import { FormControl, Pill } from '@graphiql-prototype/ui-library';

// types
import type { HandleChange } from '@graphiql-prototype/ui-library';

export const A = () => {
  const [val, setVal] = useState<string>('');

  const handleChange = ({ name, value }: HandleChange) => {
    setVal(value as string);
  };

  return (
    <FormControl
      control={{
        currentValue: val,
        handleChange,
        name: `FormControl FieldInput`,
        placeholder: 'placeholder value',
      }}
      label={`variableName`}
      labelAddOn={<Pill copy={`[String!]!`} />}
    />
  );
};

A.storyName = 'FieldInput with labelAddOn';

export const B = () => {
  const [val, setVal] = useState<string>('');

  const handleChange = ({ name, value }: HandleChange) => {
    setVal(value as string);
  };

  return (
    <FormControl
      control={{
        currentValue: val,
        handleChange,
        name: `FormControl FieldInput`,
        placeholder: 'placeholder value',
      }}
      label={`variableName`}
    />
  );
};

B.storyName = 'FieldInput without labelAddOn';

export const C = () => {
  const [val, setVal] = useState<string>('');

  const handleChange = ({ name, value }: HandleChange) => {
    setVal(value as string);
  };
  return (
    <FormControl
      control={{
        currentValue: val,
        handleChange,
        name: `FormControl FieldSelect`,
        options: [
          {
            value: 'true',
            name: 'True',
          },
          {
            value: 'false',
            name: 'False',
          },
        ],
      }}
      label={`variableName`}
      labelAddOn={<Pill copy={`[SomeEnum!]!`} />}
    />
  );
};

C.storyName = 'FieldSelect with labelAddOn';

export const D = () => {
  const [val, setVal] = useState<string>('');

  const handleChange = ({ name, value }: HandleChange) => {
    setVal(value as string);
  };

  return (
    <FormControl
      control={{
        currentValue: val,
        handleChange,
        name: `FormControl FieldSelect`,
        options: [
          {
            value: 'true',
            name: 'True',
          },
          {
            value: 'false',
            name: 'False',
          },
        ],
      }}
      label={`variableName`}
    />
  );
};

D.storyName = 'FieldSelect without labelAddOn';
