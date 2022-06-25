import { useState, useEffect } from 'react';
import { GraphQLObjectType, GraphQLUnionType } from 'graphql';

// components
import { Describe } from '../../Describe';

// hooks
import { usePathfinder } from '../../../hooks';

// icons
import { SeparatorRound } from '../../../icons';

// styles
import { Column, DescribeWrap, Description, SeparatorWrap } from '../styles';

export const UnionType = ({ unionType }: { unionType: GraphQLUnionType }) => {
  const { descriptionsVisibility } = usePathfinder();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [types, setTypes] = useState<ReadonlyArray<GraphQLObjectType<any, any>> | null>(
    null
  );

  console.log('UnionType', { unionType });

  useEffect(() => {
    setTypes(unionType.getTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unionType]);

  return (
    <>
      {unionType.description && <Description>{unionType.description}</Description>}
      <Column>
        {types &&
          Object.keys(types)
            .sort()
            .map((type) => (
              <DescribeWrap
                descriptionsVisibility={descriptionsVisibility}
                key={types[type].name}
              >
                <SeparatorWrap>
                  <SeparatorRound />
                </SeparatorWrap>
                <Describe
                  description={types[type].description || null}
                  isSelected={false}
                  name={types[type].name}
                  type={types[type]}
                  variant="FIELD"
                />
              </DescribeWrap>
            ))}
      </Column>
    </>
  );
};
