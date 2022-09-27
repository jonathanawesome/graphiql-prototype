// type FieldTypes = 'Boolean' | 'Int' | 'Float' | 'ID' | 'String' | string;

import React from 'react';

type ControlTypes = 'INPUT' | 'SELECT';

export type ControlData = {
  name: string;
  value: string | string[];
};

export type HandleChangeSignature = ({ name, value }: ControlData) => void;

export type BaseControlProps = {
  controlType: ControlTypes;
  handleChange: HandleChangeSignature;
  name: string;
  placeholder: string;
  value: string | string[];
  variant?: 'INPUT_FIELD' | 'ARGUMENT';
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
  control: InputProps | SelectProps;
  labelAddon?: React.ReactNode;
  labelCopy: string;
  list: boolean;
};
