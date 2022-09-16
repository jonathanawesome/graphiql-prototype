import { useState } from 'react';

// components
import { FieldInput, FieldList, FieldSelect } from '@graphiql-prototype/ui-library';

// types
import type { HandleChange } from '@graphiql-prototype/ui-library';

export const FieldInputStory = () => {
  const [val, setVal] = useState<string>('somevalue');

  return (
    <FieldInput
      fieldType="TEXT"
      handleChange={({ name, value }: HandleChange) => {
        setVal(value as string);
      }}
      name={`FormControl FieldInput`}
      placeholder="placeholder"
      value={val}
    />
  );
};

FieldInputStory.storyName = 'FieldInput';

export const FieldSelectStory = () => {
  const [val, setVal] = useState<string>('');

  return (
    <FieldSelect
      fieldType="SELECT"
      handleChange={({ name, value }: HandleChange) => {
        setVal(value as string);
      }}
      // handleChange={({ name, value }) => console.log({ name, value })}
      name={`FormControl FieldSelect`}
      options={[
        {
          value: 'true',
          name: 'True',
        },
        {
          value: 'false',
          name: 'False',
        },
      ]}
      placeholder="a select placeholder"
      returnType="Boolean"
      value={val}
    />
  );
};

FieldSelectStory.storyName = 'FieldSelect';

export const FieldListIntStory = () => {
  const [vals, setVals] = useState<string[]>(['1', '2', '3', '4']);

  return (
    <>
      <div>vals: {vals}</div>
      <FieldList
        fieldType="LIST"
        handleChange={({ name, value }: HandleChange) => {
          console.log(value);
          setVals(value as string[]);
        }}
        listType="INPUT"
        name={`FieldList`}
        placeholder={'Int placccceholder'}
        returnType="Int"
        value={vals}
        // values={['1', '2', '3', '4']}
      />
    </>
  );
};

FieldListIntStory.storyName = 'FieldList - Int';

export const FieldListStringStory = () => {
  return (
    <FieldList
      fieldType="LIST"
      handleChange={({ name, value }: HandleChange) => {
        console.log(value);
      }}
      listType="INPUT"
      name={`FieldList`}
      placeholder={'String placccceholder'}
      returnType="String"
      value={['strings', 'are', 'fun']}
    />
  );
};

FieldListStringStory.storyName = 'FieldList - String';

export const FieldListFloatStory = () => {
  return (
    <FieldList
      fieldType="LIST"
      handleChange={({ name, value }: HandleChange) => {
        console.log(value);
      }}
      listType="INPUT"
      name={`FieldList`}
      placeholder={'Float placccceholder'}
      returnType="Float"
      value={['1.2', '1.23', '1.234']}
    />
  );
};

FieldListFloatStory.storyName = 'FieldList - Float';

export const FieldListIDStory = () => {
  return (
    <FieldList
      fieldType="LIST"
      handleChange={({ name, value }: HandleChange) => {
        console.log(value);
      }}
      listType="INPUT"
      name={`FieldList`}
      placeholder={'ID placccceholder'}
      returnType="ID"
      value={['cwef7w38ncfgwingh', '934wmgh283w7gnw8374gc', '2q7cfgn9n237g8qgcf']}
    />
  );
};

FieldListIDStory.storyName = 'FieldList - Id';

export const FieldListEnumStory = () => {
  return (
    <FieldList
      fieldType="LIST"
      handleChange={({ name, value }: HandleChange) => {
        console.log(value);
      }}
      listType="SELECT"
      options={[
        { value: 'Red', name: 'Red' },
        { value: 'Green', name: 'Green' },
        { value: 'Blue', name: 'Blue' },
        { value: 'Gray', name: 'Gray' },
      ]}
      name={`FieldList`}
      placeholder={'TestEnum placccceholder'}
      returnType="TestEnum"
      value={['RED', 'GREEN', 'BLUE']}
    />
  );
};

FieldListEnumStory.storyName = 'FieldList - Enum';
