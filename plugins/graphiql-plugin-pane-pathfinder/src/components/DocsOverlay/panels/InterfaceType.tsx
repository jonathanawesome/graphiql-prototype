import { GraphQLFieldMap, GraphQLInterfaceType } from 'graphql';
import { useState, useEffect } from 'react';
import { usePathfinder } from '../../../hooks';
import { SeparatorRound } from '../../../icons';
import { Describe } from '../../Describe';
import { Column, DescribeWrap, SeparatorWrap, Span } from '../styles';

export const InterfaceType = ({
  interfaceType,
}: {
  interfaceType: GraphQLInterfaceType;
}) => {
  const { descriptionsVisibility } = usePathfinder();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fields, setFields] = useState<GraphQLFieldMap<any, any> | null>(null);
  const [interfaces, setInterfaces] =
    useState<ReadonlyArray<GraphQLInterfaceType> | null>(null);

  useEffect(() => {
    setInterfaces(interfaceType.getInterfaces());
    setFields(interfaceType.getFields());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interfaceType]);

  console.log('InterfaceType', { interfaceType, fields, interfaces });
  return (
    <Column>
      <Span>{interfaceType.description && interfaceType.description}</Span>
      {/* <span>Implements: {interfaceType.name}</span> */}

      {/* {interfaces && (
        <div>
          {interfaces.map((int) => (
            <span>{int.name}??</span>
          ))}
        </div>
      )} */}

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
  // return (
  //   <div>
  //     description
  //     <span>Implements</span>
  //     <span>Fields</span>
  //   </div>
  // );
};
