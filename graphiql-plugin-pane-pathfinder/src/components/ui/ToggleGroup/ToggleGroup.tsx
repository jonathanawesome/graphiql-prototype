/** styles */
import { StyledItem, StyledToggleGroup } from './styles';

type ToggleGroupItem = {
  value: string;
  ariaLabel: string;
};

export type ToggleGroupProps = {
  ariaLabel: string;
  defaultValue: string;
  items: ToggleGroupItem[];
  onChange: (value: string) => void;
  value: string;
};

export const ToggleGroup = ({
  ariaLabel,
  defaultValue,
  items,
  onChange,
  value,
}: ToggleGroupProps) => (
  <StyledToggleGroup
    type="single"
    defaultValue={defaultValue}
    value={value}
    aria-label={ariaLabel}
    onValueChange={(value) => onChange(value)}
  >
    {items.map((item) => (
      <StyledItem key={item.value} value={item.value} aria-label={item.ariaLabel}>
        <span>{item.value}</span>
      </StyledItem>
    ))}
  </StyledToggleGroup>
);
