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
  loading = false,
}: {
  formControls: FormControlProps[];
  formType: DynamicFormProps | StaticFormProps;
  loading?: boolean;
}) => {
  return (
    <FormStyled onSubmit={(e) => e.preventDefault()}>
      <fieldset disabled={loading}>
        {formControls.map((f, i) => (
          <FormControl
            key={`${i}-${f.label}`}
            control={f.control}
            label={f.label}
            labelAddOn={f.labelAddOn}
          />
        ))}
      </fieldset>
      {formType.type === 'STATIC' && (
        <StaticSubmitHandlerButton
          disabled={loading}
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
