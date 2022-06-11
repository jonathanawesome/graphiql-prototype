import { useState } from 'react';
import { FieldNode, GraphQLObjectType } from 'graphql';
import { getActiveEditorTab } from '@graphiql-v2-prototype/graphiql-editor';

/** components */
import { Collapser, Column, Field } from '../index';

/** styles */
import { Name } from './styles';

export const RootType = ({
  rootType,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rootType: GraphQLObjectType<any, any>;
}) => {
  const activeEditorTab = getActiveEditorTab();

  const operationDefinition = activeEditorTab?.operationDefinition;

  console.log('rendering RootType', {
    operationDefinition,
    activeEditorTab,
  });

  const fields = rootType.getFields();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <Collapser
      content={
        <Column>
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
        </Column>
      }
      leadContent={<Name>{rootType.name}</Name>}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
    />
  );
};
