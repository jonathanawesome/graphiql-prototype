// components
import { FieldInput } from '../FieldInput';
import { FieldList } from '../FieldList';
import { FieldSelect } from '../FieldSelect';

// styles
import { FormControlStyled, Label, LabelWrap } from './styles';

// types
import type { FormControlProps } from '../types';

export const FormControl = ({ control, label, labelAddOn }: FormControlProps) => {
  return (
    <FormControlStyled>
      <LabelWrap>
        <Label>
          <span>{label}</span>
        </Label>
        {labelAddOn && labelAddOn}
      </LabelWrap>
      {control.fieldType === 'LIST' && <FieldList {...control} />}
      {control.fieldType === 'TEXT' && <FieldInput {...control} />}
      {control.fieldType === 'SELECT' && <FieldSelect {...control} />}
    </FormControlStyled>
  );
};
