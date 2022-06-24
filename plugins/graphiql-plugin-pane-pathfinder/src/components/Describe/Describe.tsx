import { GraphQLInputType, GraphQLOutputType } from 'graphql';

// components
import { Pills } from '../Pills';

// hooks
import { usePathfinder } from '../../hooks';

// styles
import { Description, DescribeStyled, NameAndType, Name, Type } from './styles';
import { SeparatorRound } from '../icons';

type DescribeProps = {
  name: string;
  description: string | null;
  isSelected: boolean;
  type: GraphQLOutputType | GraphQLInputType | null;
  variant: 'FIELD' | 'INLINE_FRAGMENT' | 'ARGUMENT' | 'INPUT_TYPE';
};

export const Describe = ({
  name,
  description = null,
  isSelected,
  type,
  variant,
}: DescribeProps) => {
  // console.log('rendering Describe', { name, type });

  const { descriptionsVisibility, overlay, setOverlay, pillsVisibility } =
    usePathfinder();

  return (
    <DescribeStyled
      isSelected={isSelected}
      descriptionsVisibility={descriptionsVisibility}
      type={variant}
    >
      <NameAndType>
        <Name>{name}</Name>
        {type && (
          <Type>
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
              {type.toString()}
            </button>
          </Type>
        )}
        {pillsVisibility === 'On' && type && <Pills type={type} />}
      </NameAndType>
      {description && (
        <Description>
          <SeparatorRound />
          <span>{description}</span>
        </Description>
      )}
    </DescribeStyled>
  );
};
