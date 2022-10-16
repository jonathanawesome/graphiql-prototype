import { FieldNode, GraphQLFieldMap } from 'graphql';

// components
import { Field } from '../index';
import { Message } from '@graphiql-prototype/ui-library';

// hooks
import { AncestorRoot, AncestorsArray } from '../../hooks';

// styles
import { StyledRootOperation } from './styles';

export const RootOperation = ({
  ancestors,
  fields,
}: {
  ancestors: AncestorsArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any> | undefined;
}) => {
  const { operationDefinition, operationType } = ancestors[
    ancestors.length - 1
  ] as AncestorRoot;

  // console.log('rendering RootOperation', {
  //   operationDefinition,
  //   // activeEditorTab,
  //   // editorTabs,
  // });

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
              {
                type: 'FIELD',
                field: fields[field],
                selection:
                  operationDefinition?.selectionSet?.selections.find(
                    (s) => (s as FieldNode).name.value === fields[field].name
                  ) || null,
              },
            ]}
          />
        ))}
    </StyledRootOperation>
  );
};
