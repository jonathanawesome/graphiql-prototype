import { useEffect, useState } from 'react';
import {
  FieldNode,
  GraphQLObjectType,
  OperationTypeNode,
  SelectionSetNode,
} from 'graphql';
import { useGraphiQLEditor } from '@graphiql-prototype/graphiql-editor';

// components
import { Field, ListItem } from '../index';

export const RootOperation = ({
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

  // console.log('rendering RootOperation', {
  //   operationDefinition,
  //   // activeEditorTab,
  //   // editorTabs,
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

  return (
    <ListItem
      collapsibleContent={{
        childFields: Object.keys(fields)
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
          )),
      }}
      isSelected={false}
      type={rootType}
      variant="ROOT"
    />
  );
};
