// styles
import { ButtonVariants, StyledButton } from './styles';
// types

import { IconNames } from '../../icons/types';
import { Icon } from '../../icons';

type ButtonBase = {
  action: () => void;
  label: string;
  size: ButtonVariants['size'];
};

// type ButtonGhost = ButtonBase & {
//   icon?: never;
//   variant: Extract<ButtonVariants['variant'], 'STANDARD'>;
// };

type ButtonIcon = ButtonBase & {
  icon: IconNames;
  variant: Extract<ButtonVariants['variant'], 'ICON'>;
};

type ButtonTypes =
  // ButtonGhost |
  ButtonIcon;

export const Button = ({ action, icon, label, size, variant }: ButtonTypes) => {
  return (
    <StyledButton aria-label={label} onClick={action} size={size} variant={variant}>
      {icon ? <Icon name={icon} /> : label}
    </StyledButton>
  );
};
