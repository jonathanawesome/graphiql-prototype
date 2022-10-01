// styles
import { ButtonVariants, StyledButton } from './styles';
// types

import { IconNames } from '../../icons/types';
import { Icon } from '../../icons';

type ButtonBase = {
  action: () => void;
  isDisabled?: ButtonVariants['isDisabled'];
  label: string;
  size: ButtonVariants['size'];
};

type ButtonGhost = ButtonBase & {
  icon?: never;
  style: Extract<ButtonVariants['style'], 'GHOST'>;
  type?: ButtonVariants['type'];
};

type ButtonIcon = ButtonBase & {
  icon: IconNames;
  style: Extract<ButtonVariants['style'], 'ICON'>;
  type?: never;
};

type ButtonTypes = ButtonGhost | ButtonIcon;

export const Button = ({
  action,
  icon,
  isDisabled = false,
  label,
  size,
  style,
  type = 'PRIMARY',
}: ButtonTypes) => {
  return (
    <StyledButton
      aria-label={label}
      isDisabled={isDisabled}
      onClick={isDisabled ? undefined : action}
      size={size}
      style={style}
      type={type}
    >
      {icon ? <Icon name={icon} /> : label}
    </StyledButton>
  );
};
