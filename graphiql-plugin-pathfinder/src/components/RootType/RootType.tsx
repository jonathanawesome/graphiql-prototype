import { useState } from 'react';
import { FieldNode, GraphQLObjectType } from 'graphql';
import { useGraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

/** components */
import { Caret, Field } from '../index';

/** styles */
import { Content, Root as RootWrap, Trigger } from './styles';

export const RootType = ({
  rootType,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rootType: GraphQLObjectType<any, any>;
}) => {
  const { operationDefinition } = useGraphiQL();
  // const { variables } = useVariables();

  // console.log('rendering RootType', {
  //   operationDefinition,
  //   variableDefinitions: operationDefinition?.variableDefinitions,
  //   variables,
  // });

  const fields = rootType.getFields();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <RootWrap open={isExpanded} onOpenChange={setIsExpanded}>
      <Trigger>
        <Caret isExpanded={isExpanded} />
        <span>{rootType.name}</span>
      </Trigger>

      <Content>
        {Object.keys(fields)
          .sort()
          .map((field) => (
            <Field
              key={field}
              ancestors={
                new Map([
                  [
                    `${fields[field].name}`,
                    {
                      field: fields[field],
                      selectionSet: operationDefinition?.selectionSet,
                      selection:
                        operationDefinition?.selectionSet?.selections.find(
                          (selection) =>
                            (selection as FieldNode).name.value === fields[field].name
                        ) || null,
                    },
                  ],
                  [`${rootType.name}`, { rootTypeName: rootType.name }],
                ])
              }
            />
          ))}
      </Content>
    </RootWrap>
  );
};
