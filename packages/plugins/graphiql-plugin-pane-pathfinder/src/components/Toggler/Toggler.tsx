// hooks
import { AncestorsArray, usePathfinder } from '../../hooks';

// icons
import { IndicatorArgument, IndicatorField } from '../../icons';

// styles
import { TogglerStyled } from './styles';

type TogglerBaseProps = {
  ancestors: AncestorsArray;
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
  isSelected,
  variant,
}) => {
  const { toggle } = usePathfinder();

  // console.log('Toggler', {
  //   // ancestors,
  //   // collapser,
  //   // isSelected,
  //   // operationType,
  //   variant,
  // });

  return (
    <TogglerStyled
      aria-label={`Add ${variant} to operation`}
      aria-pressed={isSelected}
      isSelected={isSelected}
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
      variant={variant}
    >
      {variant === 'ARGUMENT' && <IndicatorArgument />}
      {variant === 'FIELD' && <IndicatorField />}
    </TogglerStyled>
  );
};
