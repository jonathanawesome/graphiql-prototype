import { useEffect, useState } from 'react';

// components
import { Check, Chevron } from '../../../icons';

// styles
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

// types
import type { FieldSelectProps } from '../types';

export const FieldSelect = ({
  currentValue,
  handleChange,
  name,
  options,
}: FieldSelectProps) => {
  // console.log('rendering FieldSelect', { currentValue, options });

  const [value, setValue] = useState<string>(
    currentValue ? currentValue : options.length > 0 ? options[0].value : ''
  );

  useEffect(() => {
    if (value) {
      handleChange({
        name,
        value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <StyledSelect
      defaultValue={value}
      name={name}
      onValueChange={(value: string) => setValue(value)}
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
