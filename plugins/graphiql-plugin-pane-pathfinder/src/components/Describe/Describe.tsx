import { GraphQLInputType, GraphQLOutputType } from 'graphql';

// components
import { Pills } from '../Pills';

// hooks
import { usePathfinder } from '../../hooks';

// styles
import { Description, DescribeStyled, NameAndType, Name, Type } from './styles';
import { SeparatorRound } from '../../icons';
import { unwrapType } from '../../utils';

type DescribeProps = {
  name: string;
  description: string | null;
  isSelected: boolean;
  type: GraphQLOutputType | GraphQLInputType | null;
  variant?: 'FIELD' | 'INLINE_FRAGMENT' | 'ARGUMENT' | 'INPUT_TYPE';
};

export const Describe = ({
  name,
  description = null,
  isSelected,
  type,
  variant,
}: DescribeProps) => {
  const { descriptionsVisibility, overlay, setOverlay, pillsVisibility } =
    usePathfinder();

  // console.log('rendering Describe', {
  //   name,
  //   type,
  // });

  return (
    <DescribeStyled
      isSelected={isSelected}
      descriptionsVisibility={descriptionsVisibility}
      type={variant}
    >
      {type &&
      (!overlay.currentType ||
        (overlay.currentType && unwrapType(type) !== unwrapType(overlay.currentType))) ? (
        <button
          onClick={() =>
            setOverlay({
              prevTypes: overlay.currentType
                ? [...overlay.prevTypes, overlay.currentType]
                : [],
              currentType: type,
              visible: true,
            })
          }
        >
          <NameAndType hasDocs={true}>
            <Name>{name}</Name>
            <Type>{type.toString()}</Type>
          </NameAndType>
        </button>
      ) : (
        <NameAndType hasDocs={false}>
          <Name>{name}</Name>
          {type && <Type>{type.toString()}</Type>}
        </NameAndType>
      )}
      {pillsVisibility === 'On' && type && <Pills type={type} />}
      {description && (
        <Description>
          <SeparatorRound />
          <span>{description}</span>
        </Description>
      )}
    </DescribeStyled>
  );
};
