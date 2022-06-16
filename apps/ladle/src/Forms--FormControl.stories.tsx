import { useState } from 'react';

/** components */
import { FormControl, Pill } from '@graphiql-v2-prototype/graphiql-ui-library';

/** types */
import type { HandleChange } from '@graphiql-v2-prototype/graphiql-ui-library';

export const A = () => {
  const [val, setVal] = useState<string>('');

  const handleChange = ({ name, value }: HandleChange) => {
    setVal(value);
  };

  return (
    <FormControl
      control={{
        handleChange,
        name: `FormControl FieldInput`,
        placeholder: 'placeholder value',
        value: val,
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
    setVal(value);
  };

  return (
    <FormControl
      control={{
        handleChange,
        name: `FormControl FieldInput`,
        placeholder: 'placeholder value',
        value: val,
      }}
      label={`variableName`}
    />
  );
};

B.storyName = 'FieldInput without labelAddOn';

export const C = () => {
  const [val, setVal] = useState<string>('');

  const handleChange = ({ name, value }: HandleChange) => {
    setVal(value);
  };
  return (
    <FormControl
      control={{
        handleChange,
        name: `FormControl FieldSelect`,
        values: [
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
  // const [val, setVal] = useState<string>('');

  const handleChange = ({ name, value }: HandleChange) => {
    // setVal(value);
  };

  return (
    <FormControl
      control={{
        handleChange,
        name: `FormControl FieldSelect`,
        values: [
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
