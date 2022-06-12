/** styles */
import { StyledToggleGroup, StyledToggleItem } from './styles';

type ToggleGroupItem = {
  ariaLabel: string;
  icon?: React.ReactElement;
  value: string;
};

export type ToggleGroupProps = {
  ariaLabel: string;
  defaultValue: string;
  items: ToggleGroupItem[];
  onChange: (value: string) => void;
  size: 'regular' | 'mini';
  value: string;
};

export const ToggleGroup = ({
  ariaLabel,
  defaultValue,
  items,
  onChange,
  size = 'regular',
  value,
}: ToggleGroupProps) => (
  <StyledToggleGroup
    type="single"
    aria-label={ariaLabel}
    defaultValue={defaultValue}
    onValueChange={(value) => onChange(value)}
    size={size}
    value={value}
  >
    {items.map((item) => (
      <StyledToggleItem
        key={item.value}
        aria-label={item.ariaLabel}
        size={size}
        title={item.ariaLabel}
        value={item.value}
      >
        {item.icon ? item.icon : <span>{item.value}</span>}
      </StyledToggleItem>
    ))}
  </StyledToggleGroup>
);
