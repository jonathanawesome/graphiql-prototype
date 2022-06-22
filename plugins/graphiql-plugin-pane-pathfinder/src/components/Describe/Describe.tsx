import { GraphQLInputType, GraphQLOutputType } from 'graphql';

/** components */
import { Pills } from '../Pills';

/** hooks */
import { usePathfinder } from '../../hooks';

/** styles */
import { Description, DescribeStyled, NameTypePills, Name, Type } from './styles';
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

  const { descriptionsVisibility, pillsVisibility } = usePathfinder();

  return (
    <DescribeStyled
      isSelected={isSelected}
      descriptionsVisibility={descriptionsVisibility}
      type={variant}
    >
      <NameTypePills>
        <Name>{name}</Name>
        {type && <Type>{type.toString()}</Type>}
        {pillsVisibility === 'On' && type && <Pills type={type} />}
      </NameTypePills>
      {description && (
        <Description>
          <SeparatorRound />
          <span>{description}</span>
        </Description>
      )}
    </DescribeStyled>
  );
};
