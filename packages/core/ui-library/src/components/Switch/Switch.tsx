// import { Dispatch, SetStateAction } from 'react';

// styles
import { StyledSwitch } from './styles';

// types
import { HandleChangeSignature } from '../Control';

export const Switch = ({
  handleChange,
  isChecked,
  isDisabled = false,
  name,
  size = 'SMALL',
}: {
  handleChange: HandleChangeSignature;
  isChecked: boolean;
  isDisabled?: boolean;
  name: string;
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
}) => {
  return (
    <div className={StyledSwitch({ isChecked, isDisabled, size })}>
      <input
        checked={isChecked}
        disabled={isDisabled}
        id={name}
        name={name}
        onChange={() => handleChange({ name, value: !isChecked })}
        type="checkbox"
      />
      <label htmlFor={name}>
        <span></span>
      </label>
    </div>
  );
};
