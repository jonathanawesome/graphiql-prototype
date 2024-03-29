// type FieldTypes = 'Boolean' | 'Int' | 'Float' | 'ID' | 'String' | string;

import React from 'react';

type ControlTypes = 'INPUT' | 'SELECT';

export type ControlData = {
  name: string;
  value: string | string[] | boolean;
};

export type HandleChangeSignature = ({ name, value }: ControlData) => void;

export type BaseControlProps = {
  controlType: ControlTypes;
  handleChange: HandleChangeSignature;
  isDisabled?: boolean;
  name: string;
  placeholder: string;
  value: string | string[] | boolean;
};

export type InputProps = BaseControlProps & {
  controlType: 'INPUT';
  options?: never;
};

type SelectOptions = { name: string; value: string };

export type SelectProps = BaseControlProps & {
  controlType: 'SELECT';
  options: Array<SelectOptions>;
};

export type ListProps = InputProps | SelectProps;

export type ControlProps = {
  alignment?: 'LEFT' | 'RIGHT';
  control: InputProps | SelectProps;
  displayLabel?: boolean;
  isDisabled?: boolean;
  labelAddon?: React.ReactNode;
  labelCopy: string;
  list: boolean;
};
