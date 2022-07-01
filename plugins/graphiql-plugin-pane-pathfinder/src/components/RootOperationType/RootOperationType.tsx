import { useState } from 'react';
import { FieldNode, GraphQLObjectType, OperationTypeNode } from 'graphql';
import { useGraphiQLEditor } from '@graphiql-v2-prototype/graphiql-editor';

// components
import { Collapser, Column, Field } from '../index';

// styles
import { Name, RootOperationTypeStyled } from './styles';

export const RootOperationType = ({
  operationType,
  rootType,
}: {
  operationType: OperationTypeNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rootType: GraphQLObjectType<any, any>;
}) => {
  const { activeEditorTabId, editorTabs } = useGraphiQLEditor();
  const activeEditorTab = editorTabs.find(
    (editorTab) => editorTab.editorTabId === activeEditorTabId
  );

  const operationDefinition = activeEditorTab?.operationDefinition;
  const activeOperationType = operationDefinition?.operation;

  // console.log('rendering RootOperationType', {
  //   operationDefinition,
  //   activeEditorTab,
  // });

  const fields = rootType.getFields();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const selectionSet = () => {
    if (!activeOperationType || activeOperationType === operationType) {
      return operationDefinition?.selectionSet;
    }
    return undefined;
  };

  return (
    <RootOperationTypeStyled>
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
                          selectionSet: selectionSet(),
                          selection:
                            operationDefinition?.selectionSet?.selections.find(
                              (selection) =>
                                (selection as FieldNode).name.value === fields[field].name
                            ) || null,
                        },
                      ],
                    ])
                  }
                  operationType={operationType}
                />
              ))}
          </Column>
        }
        leadContent={<Name>{rootType.name}</Name>}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    </RootOperationTypeStyled>
  );
};
