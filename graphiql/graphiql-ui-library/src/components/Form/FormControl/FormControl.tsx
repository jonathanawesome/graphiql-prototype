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
      {'typeNameValue' in control && <FieldList {...control} />}
      {'placeholder' in control && <FieldInput {...control} />}
      {'options' in control && <FieldSelect {...control} />}
    </FormControlStyled>
  );
};
