import React from 'react';

/** components */
import { FormControl } from './FormControl';

/** styles */
import { FormStyled, StaticSubmitHandler } from './styles';

/** types */
import { DynamicFormProps, FormControlProps, StaticFormProps } from './types';

export const Form = ({
  formControls,
  formType,
}: {
  formControls: FormControlProps[];
  formType: DynamicFormProps | StaticFormProps;
}) => {
  return (
    <FormStyled>
      {formControls.map((f, i) => (
        <FormControl
          key={`${i}-${f.label}`}
          control={f.control}
          label={f.label}
          labelAddOn={f.labelAddOn}
        />
      ))}
      {formType.type === 'STATIC' && (
        <StaticSubmitHandler onClick={(e) => formType.submitHandler(e)}>
          submit
        </StaticSubmitHandler>
      )}
    </FormStyled>
  );
};
