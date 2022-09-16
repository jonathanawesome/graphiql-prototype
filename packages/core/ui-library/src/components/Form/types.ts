import { GraphQLSchema } from 'graphql';

export type HandleChange = {
  name: string;
  value: string | string[];
};

export type HandleChangeSignature = ({ name, value }: HandleChange) => void;

// Form
export type DynamicFormProps = {
  type: 'DYNAMIC';
  submitHandler?: never;
};

export type StaticFormProps = {
  type: 'STATIC';
  buttonCopy?: string;
  submitHandler: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
};

// Field
export type FieldBaseProps = {
  fieldType: 'TEXT' | 'SELECT' | 'LIST';
  handleChange: HandleChangeSignature;
  name: string;
  placeholder: string;
  value: string | string[];
};

// FieldInput
export type FieldInputProps = FieldBaseProps & {
  fieldType: 'TEXT';
  options?: never;
  value: string;
};

// FieldSelect
export type FieldSelectOption = { value: string; name: string; description?: string };

export type FieldSelectProps = FieldBaseProps & {
  fieldType: 'SELECT';
  options: FieldSelectOption[];
  returnType: 'Boolean' | 'Int' | 'Float' | 'String' | 'ID' | string;
  value: string;
};

// FieldList
type FieldListBaseProps = FieldBaseProps & {
  fieldType: 'LIST';
  returnType: 'Boolean' | 'Int' | 'Float' | 'String' | 'ID' | string;
  value: string[];
};

type FieldListInputProps = FieldListBaseProps & {
  listType: 'INPUT';
  options?: never;
};

type FieldListSelectProps = FieldListBaseProps & {
  listType: 'SELECT';
  options: FieldSelectOption[];
};

export type FieldListProps = FieldListInputProps | FieldListSelectProps;

// FormControl
export type FormControlProps = {
  control: FieldInputProps | FieldSelectProps | FieldListProps;
  label: string;
  labelAddOn?: React.ReactElement;
};
