// components
import { Icon } from '../Icon';

// styles
import { ButtonVariants, StyledButton } from './styles';

// types
import { IconNames } from '../Icon';

type ButtonBase = {
  action?: () => void | Promise<void>;
  controls?: string | undefined;
  expanded?: boolean | undefined;
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

export type ButtonTypes = ButtonGhost | ButtonIcon;

export const Button = ({
  action,
  controls = undefined,
  expanded = undefined,
  icon,
  isDisabled = false,
  label,
  size,
  style,
  type = 'PRIMARY',
}: ButtonTypes) => {
  return (
    <button
      className={StyledButton({ isDisabled, size, style, type })}
      aria-controls={controls}
      aria-expanded={expanded}
      aria-label={label}
      onClick={isDisabled ? undefined : action}
      title={label}
      data-whatever="dasdasd"
    >
      {icon ? <Icon name={icon} /> : label}
    </button>
  );
};
