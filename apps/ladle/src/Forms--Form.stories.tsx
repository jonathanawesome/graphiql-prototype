import React, { useEffect, useState } from 'react';

/** components */
import { Pill, Form } from '@graphiql-v2-prototype/graphiql-ui-library';

/** types */
import type { HandleChange } from '@graphiql-v2-prototype/graphiql-ui-library';

export const StaticForm = () => {
  const [values, setValues] = useState<Record<string, string | string[]> | null>(null);

  const handleChange = ({ name, value }: HandleChange) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const submitHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!values) {
      alert("you haven't entered any data");
    } else {
      alert(`values: ${JSON.stringify(values, null, ' ')}`);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 24, width: '100%' }}>
      <Form
        formType={{
          type: 'STATIC',
          submitHandler,
        }}
        formControls={[
          {
            control: {
              currentValue: values ? (values[`FormControl FieldInput1`] as string) : '',
              handleChange,
              name: `FormControl FieldInput1`,
              placeholder: 'placeholder value',
            },
            label: `variableName`,
            labelAddOn: <Pill copy={`[String!]!`} />,
          },
          {
            control: {
              currentValue: values ? (values[`FormControl FieldInput2`] as string) : '',
              handleChange,
              name: `FormControl FieldInput2`,
              placeholder: 'placeholder value',
            },
            label: `variableName`,
            labelAddOn: <Pill copy={`[String!]!`} />,
          },
          {
            control: {
              currentValue: values ? (values[`FormControl FieldSelect`] as string) : '',
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
            },
            label: `variableName`,
            labelAddOn: <Pill copy={`[SomeEnum!]!`} />,
          },
        ]}
      />
      <div>
        {values &&
          Object.keys(values).map((v) => (
            <div key={v} style={{ display: 'flex', gap: 12 }}>
              <span>{v}</span>
              <span>{values[v]}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

StaticForm.storyName = 'StaticForm';

export const DynamicForm = () => {
  const [values, setValues] = useState<Record<string, string | string[]> | null>(null);

  const handleChange = ({ name, value }: HandleChange) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log('do something with your values', { values });
  }, [values]);

  return (
    <section>
      <Form
        formType={{ type: 'DYNAMIC' }}
        formControls={[
          {
            control: {
              currentValue: values ? (values[`FormControl FieldInput1`] as string) : '',
              handleChange,
              name: `FormControl FieldInput1`,
              placeholder: 'placeholder value',
            },
            label: `variableName`,
            labelAddOn: <Pill copy={`[String!]!`} />,
          },
          {
            control: {
              currentValue: values ? (values[`FormControl FieldInput2`] as string) : '',
              handleChange,
              name: `FormControl FieldInput2`,
              placeholder: 'placeholder value',
            },
            label: `variableName`,
            labelAddOn: <Pill copy={`[String!]!`} />,
          },
          {
            control: {
              currentValue: values ? (values[`FormControl FieldSelect`] as string) : '',
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
            },
            label: `variableName`,
            labelAddOn: <Pill copy={`[SomeEnum!]!`} />,
          },
        ]}
      />
      <div>
        {values &&
          Object.keys(values).map((v) => (
            <div key={v} style={{ display: 'flex', gap: 12 }}>
              <span>{v}</span>
              <span>{values[v]}</span>
            </div>
          ))}
      </div>
    </section>
  );
};

DynamicForm.storyName = 'DynamicForm';
