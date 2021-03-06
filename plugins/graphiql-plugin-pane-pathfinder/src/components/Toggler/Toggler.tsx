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
  fieldOrArgumentName: string;
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
  fieldOrArgumentName,
  isSelected,
  operationType,
  variant,
}) => {
  const { toggle } = usePathfinder();

  const breadcrumbs = [...ancestors.keys()]
    .map((k) => k.split('-')[0])
    .reverse()
    .join('/');

  // console.log('Toggler', {
  //   // ancestors,
  //   // collapser,
  //   // isSelected,
  //   // operationType,
  //   variant,
  // });

  return (
    <TogglerStyled
      aria-label={`Add ${breadcrumbs} ${variant} to operation`}
      aria-pressed={isSelected}
      isSelected={isSelected}
      onClick={() => {
        if (collapser) {
          const { isCollapsed, setIsCollapsed } = collapser;

          if (!isSelected && isCollapsed) {
            setIsCollapsed(false);
          }
          if (isSelected && !isCollapsed) {
            setIsCollapsed(true);
          }
        }
        return toggle({ ancestors, operationType });
      }}
      type="button"
      variant={variant}
    >
      {variant === 'ARGUMENT' && <IndicatorArgument />}
      {variant === 'FIELD' && <IndicatorField />}
    </TogglerStyled>
  );
};
