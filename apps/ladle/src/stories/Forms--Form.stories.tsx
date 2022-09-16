import React, { useEffect, useState } from 'react';

// components
import { Pill, Form } from '@graphiql-prototype/ui-library';

// types
import type { HandleChange } from '@graphiql-prototype/ui-library';

export const SimpleFieldInputForm = () => {
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
    <Form
      formType={{ type: 'DYNAMIC' }}
      formControls={[
        {
          control: {
            value: values ? (values[`FormControlFieldInput1`] as string) : '',
            handleChange,
            name: `FormControlFieldInput1`,
            placeholder: 'some input string',
          },
          label: `variableName`,
          // labelAddOn: <Pill copy={`[String!]!`} />,
        },
      ]}
    />
  );
};

export const SimpleFieldSelectForm = () => {
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
    <Form
      formType={{ type: 'DYNAMIC' }}
      formControls={[
        {
          control: {
            fieldType: 'SELECT',
            value: values ? (values[`FormControlFieldSelect1`] as string) : '',
            handleChange,
            name: `FormControlFieldSelect1`,
            options: [
              { name: 'One', value: 'One' },
              { name: 'Two', value: 'Two' },
            ],
            placeholder: 'placeholder value',
            returnType: 'value',
          },
          label: `variableName`,
          labelAddOn: <Pill copy={`[String!]!`} />,
        },
      ]}
    />
  );
};

export const SimpleFieldListInputForm = () => {
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
    <Form
      formType={{ type: 'DYNAMIC' }}
      formControls={[
        {
          control: {
            fieldType: 'LIST',
            listType: 'INPUT',
            value: '',
            handleChange,
            name: `FormControlFieldSelect1`,
            placeholder: 'placeholder value',
          },
          label: `variableName`,
        },
      ]}
    />
  );
};

export const SimpleFieldListSelectForm = () => {
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
    <Form
      formType={{ type: 'DYNAMIC' }}
      formControls={[
        {
          control: {
            fieldType: 'LIST',
            listType: 'SELECT',
            value: values ? (values[`FormControlFieldListSelect1`] as string) : '',
            handleChange,
            name: `FormControlFieldListSelect1`,
            options: [
              { name: 'One', value: 'One' },
              { name: 'Two', value: 'Two' },
            ],
            placeholder: 'placeholder value',
            returnType: 'value',
          },
          label: `variableName`,
        },
      ]}
    />
  );
};

// export const StaticForm = () => {
//   const [values, setValues] = useState<Record<string, string | string[]> | null>(null);

//   const handleChange = ({ name, value }: HandleChange) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const submitHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (!values) {
//       alert("you haven't entered any data");
//     } else {
//       alert(`values: ${JSON.stringify(values, null, ' ')}`);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', gap: 24, width: '100%' }}>
//       <Form
//         formType={{
//           type: 'STATIC',
//           submitHandler,
//         }}
//         formControls={[
//           {
//             control: {
//               value: values ? (values[`FormControl FieldInput1`] as string) : '',
//               handleChange,
//               name: `FormControl FieldInput1`,
//               placeholder: 'placeholder value',
//             },
//             label: `variableName`,
//             labelAddOn: <Pill copy={`[String!]!`} />,
//           },
//           {
//             control: {
//               value: values ? (values[`FormControl FieldInput2`] as string) : '',
//               handleChange,
//               name: `FormControl FieldInput2`,
//               placeholder: 'placeholder value',
//             },
//             label: `variableName`,
//             labelAddOn: <Pill copy={`[String!]!`} />,
//           },
//           {
//             control: {
//               value: values ? (values[`FormControl FieldSelect`] as string) : '',
//               handleChange,
//               name: `FormControl FieldSelect`,
//               options: [
//                 {
//                   value: 'true',
//                   name: 'True',
//                 },
//                 {
//                   value: 'false',
//                   name: 'False',
//                 },
//               ],
//             },
//             label: `variableName`,
//             labelAddOn: <Pill copy={`[SomeEnum!]!`} />,
//           },
//         ]}
//       />
//       <div>
//         {values &&
//           Object.keys(values).map((v) => (
//             <div key={v} style={{ display: 'flex', gap: 12 }}>
//               <span>{v}</span>
//               <span>{values[v]}</span>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export const DynamicForm = () => {
//   const [values, setValues] = useState<Record<string, string> | null>(null);

//   const handleChange = ({ name, value }: HandleChange) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const test: Record<string, string | Array<string | number | boolean>> = {
//     text1: 'value',
//     select2: 'value',
//     list1: ['4423cg423g', '3cg42345hgx', '245ch24h5gx'],
//     list2: [true, false, true],
//     list3: [123, 567547, 234.3464356],
//   };

//   useEffect(() => {
//     console.log('do something with your values', { values });
//   }, [values]);

//   return (
//     <section>
//       <Form
//         formType={{ type: 'DYNAMIC' }}
//         formControls={[
//           {
//             control: {
//               value: values ? (values[`FormControl FieldInput1`] as string) : '',
//               handleChange,
//               name: `FormControl FieldInput1`,
//               placeholder: 'placeholder value',
//             },
//             label: `variableName`,
//             labelAddOn: <Pill copy={`[String!]!`} />,
//           },
//           {
//             control: {
//               value: values ? (values[`FormControl FieldInput2`] as string) : '',
//               handleChange,
//               name: `FormControl FieldInput2`,
//               placeholder: 'placeholder value',
//             },
//             label: `variableName`,
//             labelAddOn: <Pill copy={`[String!]!`} />,
//           },
//           {
//             control: {
//               value: values ? (values[`FormControl FieldSelect`] as string) : '',
//               handleChange,
//               name: `FormControl FieldSelect`,
//               options: [
//                 {
//                   value: 'true',
//                   name: 'True',
//                 },
//                 {
//                   value: 'false',
//                   name: 'False',
//                 },
//               ],
//             },
//             label: `variableName`,
//             labelAddOn: <Pill copy={`[SomeEnum!]!`} />,
//           },
//         ]}
//       />
//       <div>
//         {values &&
//           Object.keys(values).map((v) => (
//             <div key={v} style={{ display: 'flex', gap: 12 }}>
//               <span>{v}</span>
//               <span>{values[v]}</span>
//             </div>
//           ))}
//       </div>
//     </section>
//   );
// };

// export const HeadersForm = () => {
//   const [values, setValues] = useState<Record<string, string | string[]> | null>(null);

//   const handleChange = ({ name, value }: HandleChange) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     console.log('do something with your values', { values });
//   }, [values]);

//   return (
//     <section>
//       <Form
//         formType={{ type: 'DYNAMIC' }}
//         formControls={[
//           {
//             control: {
//               value: values ? (values[`FormControl FieldInput1`] as string) : '',
//               handleChange,
//               name: `FormControl FieldInput1`,
//               placeholder: 'placeholder value',
//             },
//             label: `variableName`,
//             labelAddOn: <Pill copy={`[String!]!`} />,
//           },
//           {
//             control: {
//               value: values ? (values[`FormControl FieldInput2`] as string) : '',
//               handleChange,
//               name: `FormControl FieldInput2`,
//               placeholder: 'placeholder value',
//             },
//             label: `variableName`,
//             labelAddOn: <Pill copy={`[String!]!`} />,
//           },
//           {
//             control: {
//               value: values ? (values[`FormControl FieldSelect`] as string) : '',
//               handleChange,
//               name: `FormControl FieldSelect`,
//               options: [
//                 {
//                   value: 'true',
//                   name: 'True',
//                 },
//                 {
//                   value: 'false',
//                   name: 'False',
//                 },
//               ],
//             },
//             label: `variableName`,
//             labelAddOn: <Pill copy={`[SomeEnum!]!`} />,
//           },
//         ]}
//       />
//       <div>
//         {values &&
//           Object.keys(values).map((v) => (
//             <div key={v} style={{ display: 'flex', gap: 12 }}>
//               <span>{v}</span>
//               <span>{values[v]}</span>
//             </div>
//           ))}
//       </div>
//     </section>
//   );
// };
