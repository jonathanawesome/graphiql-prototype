// styles
import { ButtonVariants, StyledButton } from './styles';
// types

import { IconNames } from '../../icons/types';
import { Icon } from '../../icons';

type ButtonBase = {
  action: () => void;
  active?: boolean;
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

export const Button = ({ action, active, icon, label, size, variant }: ButtonTypes) => {
  return (
    <StyledButton onClick={action} variant={variant} size={size} aria-label={label}>
      {icon ? <Icon name={icon} /> : label}
    </StyledButton>
  );
};
