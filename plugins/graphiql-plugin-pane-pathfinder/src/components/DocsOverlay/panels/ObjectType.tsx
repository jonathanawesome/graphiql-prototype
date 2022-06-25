import { useEffect, useState } from 'react';
import { GraphQLFieldMap, GraphQLInterfaceType, GraphQLObjectType } from 'graphql';

// components
import { Describe } from '../../Describe';
import { SeparatorRound } from '../../../icons';

// hooks
import { usePathfinder } from '../../../hooks';

// styles
import { Column, DescribeWrap, SeparatorWrap, Description, SmallCaps } from '../styles';

export const ObjectType = ({ objectType }: { objectType: GraphQLObjectType }) => {
  const { descriptionsVisibility } = usePathfinder();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fields, setFields] = useState<GraphQLFieldMap<any, any> | null>(null);
  const [interfaces, setInterfaces] =
    useState<ReadonlyArray<GraphQLInterfaceType> | null>(null);

  console.log('ObjectType', { objectType });

  useEffect(() => {
    setInterfaces(objectType.getInterfaces());
    setFields(objectType.getFields());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectType]);

  return (
    <>
      {objectType.description && <Description>{objectType.description}</Description>}

      <Column>
        {/* {interfaces && (
          <div>
            {interfaces.map((int) => (
              <DescribeWrap
                descriptionsVisibility={descriptionsVisibility}
                key={int.name}
              >
                <SeparatorWrap>
                  <SeparatorRound />
                </SeparatorWrap>
                <Describe
                  description={int.description || null}
                  isSelected={false}
                  name={int.name}
                  type={null}
                  variant="FIELD"
                />
              </DescribeWrap>
            ))}
          </div>
        )} */}
        <SmallCaps>Fields</SmallCaps>
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
    </>
  );
};
