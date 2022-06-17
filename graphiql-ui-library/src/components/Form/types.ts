export type HandleChange = {
  name: string;
  value: string | string[];
};

export type HandleChangeSignature = ({ name, value }: HandleChange) => void;

/** Form */
export type DynamicFormProps = {
  type: 'DYNAMIC';
  submitHandler?: never;
};

export type StaticFormProps = {
  type: 'STATIC';
  buttonCopy?: string;
  submitHandler: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
};

/** FormControl */
export type FormControlProps = {
  control: FieldInputProps | FieldSelectProps | FieldListProps;
  label: string;
  labelAddOn?: React.ReactElement;
};

/** FieldInput */
export type FieldInputProps = {
  currentValue: string;
  handleChange: HandleChangeSignature;
  name: string;
  placeholder: string;
};

/** FieldSelect */
export type FieldSelectOption = { value: string; name: string; description?: string };

export type FieldSelectProps = {
  currentValue: string;
  handleChange: HandleChangeSignature;
  name: string;
  options: FieldSelectOption[];
};

/** FieldList */
export type FieldListProps = {
  currentValue: string[];
  handleChange: HandleChangeSignature;
  name: string;
  typeNameValue: string;
};
