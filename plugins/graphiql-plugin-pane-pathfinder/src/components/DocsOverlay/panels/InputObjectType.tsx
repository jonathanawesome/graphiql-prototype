import { useEffect, useState } from 'react';
import { GraphQLInputFieldMap, GraphQLInputObjectType } from 'graphql';

// components
import { Describe } from '../../Describe';

// hooks
import { usePathfinder } from '../../../hooks';

// icons
import { SeparatorRound } from '../../../icons';

// styles
import { Column, DescribeWrap, SeparatorWrap } from '../styles';

export const InputObjectType = ({
  inputObjectType,
}: {
  inputObjectType: GraphQLInputObjectType;
}) => {
  const { descriptionsVisibility } = usePathfinder();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fields, setFields] = useState<GraphQLInputFieldMap | null>(null);

  // console.log('InputObjectType', { inputObjectType });

  useEffect(() => {
    setFields(inputObjectType.getFields());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputObjectType]);

  return (
    <Column>
      {fields &&
        Object.keys(fields)
          .sort()
          .map((field) => (
            <DescribeWrap
              descriptionsVisibility={descriptionsVisibility}
              key={fields[field].name}
            >
              <SeparatorWrap>
                <SeparatorRound />
              </SeparatorWrap>
              <Describe
                description={fields[field].description || null}
                isSelected={false}
                name={fields[field].name}
                type={fields[field].type}
                variant="FIELD"
              />
            </DescribeWrap>
          ))}
    </Column>
  );
};
