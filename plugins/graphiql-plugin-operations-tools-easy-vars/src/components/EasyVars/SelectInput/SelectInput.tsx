import { useEffect } from 'react';

/** components */
import { Check, Chevron } from '@graphiql-v2-prototype/graphiql-ui-library';

/** styles */
import {
  Description,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  StyledSelect,
} from './styles';

/** types */
import { HandleVariableChangeSignature } from '../types';

export const SelectInput = ({
  handleVariableChange,
  id,
  values,
  variableName,
}: {
  handleVariableChange: HandleVariableChangeSignature;
  id: string;
  values: Array<{ value: string; name: string; description?: string }>;
  variableName: string;
}) => {
  useEffect(() => {
    // set a default value in our variables state
    handleVariableChange({ id, value: values[0].value, variableName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledSelect
      defaultValue={values[0].value}
      name={variableName}
      onValueChange={(value) => {
        console.log('using SelectInput', { variableName, value });

        return handleVariableChange({ id, value, variableName });
      }}
    >
      <SelectTrigger aria-label="Values">
        <SelectValue />
        <SelectIcon>
          <Chevron />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent>
        <SelectViewport>
          {values.map((v) => {
            return (
              <SelectItem key={v.name} value={v.value}>
                <SelectItemText>{v.name}</SelectItemText>
                <Description>{v.description}</Description>
                <SelectItemIndicator>
                  <Check />
                </SelectItemIndicator>
              </SelectItem>
            );
          })}
        </SelectViewport>
      </SelectContent>
    </StyledSelect>
  );
};
