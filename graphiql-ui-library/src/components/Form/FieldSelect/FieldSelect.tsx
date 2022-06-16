import { useEffect } from 'react';

/** components */
import { Check, Chevron } from '../../../icons';

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
import type { FieldSelectProps } from '../types';

export const FieldSelect = ({
  currentValue,
  handleChange,
  name,
  options,
}: FieldSelectProps) => {
  // console.log('rendering FieldSelect', { currentValue, options });

  useEffect(() => {
    handleChange({
      name,
      value: options[0].value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledSelect
      defaultValue={currentValue || options[0].value}
      name={name}
      onValueChange={(value: string) => {
        return handleChange({
          name,
          value,
        });
      }}
    >
      <SelectTrigger>
        <SelectValue />
        <SelectIcon>
          <Chevron />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent>
        <SelectViewport>
          {options.map((v) => {
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
