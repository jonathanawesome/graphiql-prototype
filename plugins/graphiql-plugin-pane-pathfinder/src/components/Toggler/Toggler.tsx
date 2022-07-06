import { OperationTypeNode } from 'graphql';

// hooks
import { usePathfinder } from '../../hooks';

// icons
import { IndicatorArgument, IndicatorField } from '../../icons';

// styles
import { TogglerStyled } from './styles';

// types
import { AncestorMap } from '../../hooks';

type TogglerBaseProps = {
  ancestors: AncestorMap;
  isSelected: boolean;
  operationType: OperationTypeNode;
  variant: 'ARGUMENT' | 'FIELD';
};

type TogglerWithCollapserProps = TogglerBaseProps & {
  collapser: {
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
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
  operationType,
  variant,
}) => {
  const { toggle } = usePathfinder();

  // console.log('Toggler', { variant });

  return (
    <TogglerStyled
      isSelected={isSelected}
      onClick={() => {
        if (collapser) {
          const { isCollapsed, setIsCollapsed } = collapser;
          if (!isSelected && isCollapsed) {
            setIsCollapsed(true);
          }
          if (!isSelected && !isCollapsed) {
            setIsCollapsed(false);
          }
        }
        return toggle({ ancestors, operationType });
      }}
      variant={variant}
    >
      {variant === 'ARGUMENT' && <IndicatorArgument />}
      {variant === 'FIELD' && <IndicatorField />}
    </TogglerStyled>
  );
};
