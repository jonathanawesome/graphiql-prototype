import { useEffect, useState } from 'react';
import { styled, theme } from '@graphiql-prototype/ui-library';

const StyledCol = styled('div', {
  display: `flex`,
  flexDirection: `column`,
  gap: 24,
  backgroundColor: theme.colors.surface1,
});

const StyledRow = styled('div', {
  display: `grid`,
  gridTemplateColumns: `160px 1fr`,
  gap: 24,
});

const StyledInfo = styled('div', {
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
  color: theme.colors.text2,

  span: {
    fontSize: 10,
  },
});

const StyledData = styled('span', {
  display: `flex`,
  alignItems: `center`,
  color: theme.colors.text1,
  fontFamily: theme.fonts.mono,
});

// components
import {
  Control,
  ControlData,
  ControlProps,
  HandleChangeSignature,
} from '@graphiql-prototype/graphiql-plugin-pane-pathfinder';

const controls: (
  handleChange: HandleChangeSignature
) => Array<Omit<ControlProps, 'handleChange'>> = (handleChange) => [
  {
    control: {
      controlType: 'SELECT',
      handleChange,
      name: 'LIST_SELECT',
      options: [
        { name: 'Option 1', value: 'option1' },
        { name: 'Option 2', value: 'option2' },
      ],
      placeholder: `A List Select`,
      returnType: 'String',
      value: ['option1', 'option1', 'option2'],
    },
    labelCopy: 'a list select',
    list: true,
  },
  {
    control: {
      controlType: 'INPUT',
      handleChange,
      name: 'LIST_INPUT',
      placeholder: `A List Input`,
      returnType: 'String',
      value: ['One', 'Two'],
    },
    labelCopy: 'a list input',
    list: true,
  },
  {
    control: {
      controlType: 'INPUT',
      handleChange,
      name: 'INPUT',
      placeholder: `An Input`,
      returnType: 'String',
      value: ``,
    },
    labelCopy: 'an input',
    list: false,
  },
  {
    control: {
      controlType: 'SELECT',
      handleChange,
      name: 'SELECT_STRING',
      options: [
        { name: 'Option 1', value: 'option1' },
        { name: 'Option 2', value: 'option2' },
      ],
      placeholder: `A string Select`,
      returnType: 'String',
      value: `option2`,
    },
    labelCopy: 'a string select',
    list: false,
  },
  {
    control: {
      controlType: 'SELECT',
      handleChange,
      name: 'SELECT_BOOLEAN',
      options: [
        { name: 'True', value: 'true' },
        { name: 'False', value: 'false' },
      ],
      placeholder: `A boolean Select`,
      returnType: 'Boolean',
      value: `true`,
    },
    labelCopy: 'a boolean select',
    list: false,
  },
];

export const ControlStory = () => {
  const [values, setValues] = useState<Record<string, ControlData>>({});

  console.log('values', { values });

  const handleChange: HandleChangeSignature = ({ name, value }) => {
    setValues((prev) => ({
      ...prev,
      [name]: { name, value },
    }));
  };

  useEffect(() => {
    setValues(
      controls(handleChange).reduce(
        (
          acc: Record<string, ControlData>,
          control: Omit<ControlProps, 'handleChange'>
        ) => ({
          ...acc,
          [control.control.name]: {
            name: control.control.name,
            value: control.control.value,
          },
        }),
        {}
      )
    );
  }, []);

  return (
    <StyledCol>
      {controls(handleChange).map((control) => (
        <StyledRow key={control.control.name}>
          <StyledInfo>
            {control.control.name}
            <StyledData>
              {values[control.control.name] ? values[control.control.name].value : ''}
            </StyledData>
          </StyledInfo>
          <Control
            control={control.control}
            labelCopy={control.labelCopy}
            list={control.list}
          />
        </StyledRow>
      ))}
    </StyledCol>
  );
};
