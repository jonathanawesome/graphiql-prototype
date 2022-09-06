import { ButtonVariants, StyledButton } from './styles';

type ButtonBase = {
  action: () => void;
  active?: boolean;
  label: string;
  size: ButtonVariants['size'];
};

type ButtonGhost = ButtonBase & {
  icon?: never;
  variant: Extract<ButtonVariants['variant'], 'STANDARD'>;
};

type ButtonIcon = ButtonBase & {
  icon: React.ReactElement;
  variant: Extract<ButtonVariants['variant'], 'ICON'>;
};

type ButtonTypes = ButtonGhost | ButtonIcon;

export const Button = ({ action, active, icon, label, size, variant }: ButtonTypes) => {
  return (
    <StyledButton onClick={action} variant={variant} size={size}>
      {icon ? icon : label}
    </StyledButton>
  );
};
