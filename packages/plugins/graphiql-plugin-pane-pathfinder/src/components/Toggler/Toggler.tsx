// hooks
import { AncestorsArray, usePathfinder } from '../../hooks';

// icons
import { IndicatorArgument, IndicatorField } from '../../icons';

// styles
import { StyledToggler } from './styles';

type TogglerBaseProps = {
  ancestors: AncestorsArray;
  isDisabled?: boolean;
  isSelected: boolean;
  variant: 'ARGUMENT' | 'FIELD';
};

type TogglerWithCollapserProps = TogglerBaseProps & {
  collapser: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

type TogglerWithoutCollapserProps = TogglerBaseProps & {
  collapser?: never;
};

export type ToggleProps = TogglerWithCollapserProps | TogglerWithoutCollapserProps;

export const Toggler: React.FC<ToggleProps> = ({
  ancestors,
  collapser,
  isDisabled = false,
  isSelected,
  variant,
}) => {
  const { toggle } = usePathfinder();

  // breadcrumbs help identify toggle buttons in tests
  const breadcrumbs = [...ancestors]
    // eslint-disable-next-line consistent-return
    .map((k) => {
      if (k.type === 'FIELD') {
        return k.field.name;
      }
      if (k.type === 'ARGUMENT') {
        return k.argument.name;
      }
    })
    .reverse()
    .slice(0, -1)
    .join('/');

  // console.log('Toggler', {
  //   // ancestors,
  //   breadcrumbs,
  // });

  return (
    <button
      aria-label={`Add ${breadcrumbs} ${variant} to operation`}
      aria-pressed={isSelected}
      className={StyledToggler({ isSelected, variant })}
      disabled={isDisabled}
      onClick={() => {
        if (collapser) {
          // const { isOpen, setIsOpen } = collapser;
          // if (!isSelected && isOpen) {
          //   setIsOpen(false);
          // }
          // if (isSelected && !isOpen) {
          //   setIsOpen(true);
          // }
        }
        return toggle({
          ancestors,
        });
      }}
      type="button"
    >
      {variant === 'ARGUMENT' && <IndicatorArgument />}
      {variant === 'FIELD' && <IndicatorField />}
    </button>
  );
};
