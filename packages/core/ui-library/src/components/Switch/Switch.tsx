import { Dispatch, SetStateAction } from 'react';

// styles
import { StyledSwitch } from './styles';

export const Switch = ({
  handleChange,
  isChecked,
  name,
  size = 'SMALL',
}: {
  handleChange: Dispatch<SetStateAction<boolean>>;
  isChecked: boolean;
  name: string;
  size: 'SMALL' | 'LARGE';
}) => {
  return (
    <StyledSwitch checked={isChecked} size={size}>
      <input
        type="checkbox"
        id={name}
        checked={isChecked}
        onChange={() => handleChange(!isChecked)}
      />
      <label htmlFor={name}>
        <span></span>
      </label>
    </StyledSwitch>
  );
};
