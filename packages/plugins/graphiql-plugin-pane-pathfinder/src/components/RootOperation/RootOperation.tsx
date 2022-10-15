import { useEffect, useState } from 'react';
import {
  FieldNode,
  GraphQLFieldMap,
  GraphQLObjectType,
  OperationTypeNode,
  SelectionSetNode,
} from 'graphql';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// components
import {
  Field,
  // ListItem
} from '../index';
import { Message } from '@graphiql-prototype/ui-library';

// styles
import { StyledRootOperation } from './styles';
import {
  AncestorRoot,
  // AncestorMap,
  AncestorsArray,
} from '../../hooks';

export const RootOperation = ({
  // rootType,
  // operationType,
  ancestors,
  fields,
}: {
  // ancestors: AncestorMap;
  ancestors: AncestorsArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any> | undefined;
  // operationType: OperationTypeNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // rootType: GraphQLObjectType<any, any> | null;
}) => {
  // const [selectionSet, setSelectionSet] = useState<SelectionSetNode | undefined>(
  //   undefined
  // );

  // const activeEditorTab = useEditor().getActiveTab();
  const { operationDefinition, operationType } = ancestors[
    ancestors.length - 1
  ] as AncestorRoot;

  // const operationDefinition = activeEditorTab?.operationDefinition;

  // const rootAncestor: AncestorRoot = {
  //   operationType,
  //   operationDefinition: activeEditorTab?.operationDefinition,
  // };

  // console.log('rendering RootOperation', {
  //   operationDefinition,
  //   // activeEditorTab,
  //   // editorTabs,
  // });

  // useEffect(() => {
  //   const activeOperationType = operationDefinition?.operation;
  //   if (!activeOperationType || activeOperationType === operationType) {
  //     return setSelectionSet(operationDefinition?.selectionSet);
  //   }
  //   return setSelectionSet(undefined);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [operationDefinition]);

  // const fields = rootType?.getFields();

  if (!fields) {
    return (
      <StyledRootOperation>
        <Message
          message={
            <>{`The active schema doesn’t provide a ${operationType} root operation type.`}</>
          }
          variant="WARNING"
        />
      </StyledRootOperation>
    );
  }

  return (
    <StyledRootOperation>
      {operationType === 'subscription' && (
        <Message
          message={
            <>{`TODO: Subscription operations are listed here, but not currently working.`}</>
          }
          variant="WARNING"
        />
      )}
      {Object.keys(fields)
        .sort()
        .map((field) => (
          <Field
            key={field}
            ancestors={[
              ...ancestors,
              // rootAncestor,
              {
                field: fields[field],
                // selectionSet,
                selection:
                  operationDefinition?.selectionSet?.selections.find(
                    (s) => (s as FieldNode).name.value === fields[field].name
                  ) || null,
              },
            ]}
            // operationType={operationType}
          />
        ))}
    </StyledRootOperation>
  );
};
