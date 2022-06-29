import React from 'react';

// components
import { FormControl } from './FormControl';

// styles
import { FormStyled, StaticSubmitHandlerButton } from './styles';

// types
import { DynamicFormProps, FormControlProps, StaticFormProps } from './types';

export const Form = ({
  formControls,
  formType,
}: {
  formControls: FormControlProps[];
  formType: DynamicFormProps | StaticFormProps;
}) => {
  return (
    <FormStyled onSubmit={(e) => e.preventDefault()}>
      {formControls.map((f, i) => (
        <FormControl
          key={`${i}-${f.label}`}
          control={f.control}
          label={f.label}
          labelAddOn={f.labelAddOn}
        />
      ))}
      {formType.type === 'STATIC' && (
        <StaticSubmitHandlerButton
          onClick={(e) => {
            e.preventDefault();
            formType.submitHandler(e);
          }}
        >
          {formType.buttonCopy ? formType.buttonCopy : 'Submit'}
        </StaticSubmitHandlerButton>
      )}
    </FormStyled>
  );
};
