import { useState } from 'react';
import { css, theme } from '@graphiql-prototype/ui-library';

const StyledCol = css({
  display: `flex`,
  flexDirection: `column`,
  gap: 24,
  backgroundColor: theme.colors.surface1,
});

const StyledRow = css({
  display: `grid`,
  gridTemplateColumns: `160px 1fr`,
  gap: 24,
});

const StyledInfo = css({
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
  color: theme.colors.text2,

  span: {
    fontSize: 10,
  },
});

const StyledData = css({
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
} from '@graphiql-prototype/ui-library';

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
      value: [],
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
      value: [],
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
      value: ``,
    },
    labelCopy: 'an input',
    list: false,
  },
  {
    alignment: 'LEFT',
    control: {
      controlType: 'INPUT',
      handleChange,
      name: 'INPUT_NOLABEL',
      placeholder: `An Input without a label`,
      value: ``,
    },
    displayLabel: false,
    labelCopy: 'an input without a label',
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
      value: ``,
    },
    labelCopy: 'a string select',
    list: false,
  },
  {
    alignment: 'LEFT',
    control: {
      controlType: 'SELECT',
      handleChange,
      name: 'SELECT_STRING_NOLABEL',
      options: [
        { name: 'Option 1', value: 'option1' },
        { name: 'Option 2', value: 'option2' },
      ],
      placeholder: `A string Select without a label`,
      value: ``,
    },
    displayLabel: false,
    labelCopy: 'a string select without a label',
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
      value: ``,
    },
    labelCopy: 'a boolean select',
    list: false,
  },
];

export const ControlStory = () => {
  const [values, setValues] = useState<Record<string, ControlData>>({});

  const handleChange: HandleChangeSignature = ({ name, value }) => {
    setValues((prev) => ({
      ...prev,
      [name]: { name, value },
    }));
  };

  return (
    <div className={StyledCol()}>
      {controls(handleChange).map((control) => (
        <div key={control.control.name} className={StyledRow()}>
          <div className={StyledInfo()}>
            {control.control.name}
            <span className={StyledData()}>
              {values[control.control.name] ? values[control.control.name].value : ''}
            </span>
          </div>
          <Control
            alignment={control.alignment}
            control={{
              ...control.control,
              value: values[control.control.name]
                ? values[control.control.name].value
                : control.list
                ? []
                : '',
            }}
            displayLabel={control.displayLabel}
            labelCopy={control.labelCopy}
            list={control.list}
          />
        </div>
      ))}
    </div>
  );
};
