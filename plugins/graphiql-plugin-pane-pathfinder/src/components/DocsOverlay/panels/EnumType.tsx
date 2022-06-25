import { GraphQLEnumType } from 'graphql';

// components
import { Describe } from '../../Describe';

// hooks
import { usePathfinder } from '../../../hooks';

// icons
import { SeparatorRound } from '../../../icons';

// styles
import { Column, DescribeWrap, SeparatorWrap, Span } from '../styles';

export const EnumType = ({ enumType }: { enumType: GraphQLEnumType }) => {
  const values = enumType.getValues();

  const { descriptionsVisibility } = usePathfinder();

  return (
    <Column>
      <Span>{enumType.description && enumType.description}</Span>
      {values.map((v) => (
        <DescribeWrap descriptionsVisibility={descriptionsVisibility} key={v.name}>
          <SeparatorWrap>
            <SeparatorRound />
          </SeparatorWrap>
          <Describe
            description={v.description || null}
            isSelected={false}
            name={v.name}
            type={null}
            variant="FIELD"
          />
        </DescribeWrap>
      ))}
    </Column>
  );
};
