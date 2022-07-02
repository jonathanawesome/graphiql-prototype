import { useEffect, useState } from 'react';
import {
  FieldNode,
  GraphQLObjectType,
  OperationTypeNode,
  SelectionSetNode,
} from 'graphql';
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
  const [selectionSet, setSelectionSet] = useState<SelectionSetNode | undefined>(
    undefined
  );
  const { activeEditorTabId, editorTabs } = useGraphiQLEditor();
  const activeEditorTab = editorTabs.find(
    (editorTab) => editorTab.editorTabId === activeEditorTabId
  );

  const operationDefinition = activeEditorTab?.operationDefinition;

  // console.log('rendering RootOperationType', {
  //   operationDefinition,
  //   activeEditorTab,
  //   editorTabs,
  // });

  useEffect(() => {
    const activeOperationType = operationDefinition?.operation;
    if (!activeOperationType || activeOperationType === operationType) {
      return setSelectionSet(operationDefinition?.selectionSet);
    }
    return setSelectionSet(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationDefinition]);

  const fields = rootType.getFields();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

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
                          selectionSet,
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
