import { useState } from 'react';

// components
import {
  FieldInput,
  FieldList,
  FieldSelect,
} from '@graphiql-prototype/graphiql-ui-library';

// types
import type { HandleChange } from '@graphiql-prototype/graphiql-ui-library';

export const FieldInputStory = () => {
  const [val, setVal] = useState<string>('');

  return (
    <FieldInput
      currentValue={val}
      handleChange={({ name, value }: HandleChange) => {
        setVal(value as string);
      }}
      name={`FormControl FieldInput`}
      placeholder="placeholder"
    />
  );
};

FieldInputStory.storyName = 'FieldInput';

export const FieldSelectStory = () => {
  return (
    <FieldSelect
      currentValue="false"
      handleChange={({ name, value }) => console.log({ name, value })}
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
    />
  );
};

FieldSelectStory.storyName = 'FieldSelect';

export const FieldListIntStory = () => {
  return (
    <FieldList
      currentValue={['1', '2', '3', '4']}
      handleChange={({ name, value }: HandleChange) => {
        console.log(value);
      }}
      name={`FieldList`}
      typeNameValue="Int"
    />
  );
};

FieldListIntStory.storyName = 'FieldList - Int';

export const FieldListStringStory = () => {
  return (
    <FieldList
      currentValue={['strings', 'are', 'fun']}
      handleChange={({ name, value }: HandleChange) => {
        console.log(value);
      }}
      name={`FieldList`}
      typeNameValue="String"
    />
  );
};

FieldListStringStory.storyName = 'FieldList - String';

export const FieldListFloatStory = () => {
  return (
    <FieldList
      currentValue={['1.2', '1.23', '1.234']}
      handleChange={({ name, value }: HandleChange) => {
        console.log(value);
      }}
      name={`FieldList`}
      typeNameValue="Float"
    />
  );
};

FieldListFloatStory.storyName = 'FieldList - Float';

export const FieldListIDStory = () => {
  return (
    <FieldList
      currentValue={['cwef7w38ncfgwingh', '934wmgh283w7gnw8374gc', '2q7cfgn9n237g8qgcf']}
      handleChange={({ name, value }: HandleChange) => {
        console.log(value);
      }}
      name={`FieldList`}
      typeNameValue="ID"
    />
  );
};

FieldListIDStory.storyName = 'FieldList - Id';

export const FieldListEnumStory = () => {
  return (
    <FieldList
      currentValue={['RED', 'GREEN', 'BLUE']}
      handleChange={({ name, value }: HandleChange) => {
        console.log(value);
      }}
      name={`FieldList`}
      typeNameValue="TestEnum"
    />
  );
};

FieldListEnumStory.storyName = 'FieldList - Enum';
