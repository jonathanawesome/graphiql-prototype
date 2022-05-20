import { useState } from 'react';
import {
  GraphQLObjectType,
  isRequiredArgument,
  Kind,
  OperationDefinitionNode,
  VariableDefinitionNode,
} from 'graphql';

/** components */
// import {
//   Root as CollapsibleRoot,
//   Trigger as CollapsibleTrigger,
//   Content as CollapsibleContent,
// } from '@radix-ui/react-collapsible';
import { Caret, Field } from '@/components';

/** hooks */
import { useGraphiQL } from '@/hooks';

/** styles */
import { Content, Root as RootWrap, Trigger } from './styles';

/** types */
import { EditFieldAction } from '@/types';

/** utils */
import { editFieldSelection, getVariableDefinitionsForField } from '@/utils';

export const RootType = ({
  rootType,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rootType: GraphQLObjectType<any, any>;
}) => {
  const { onEditDefinition, operationDefinition } = useGraphiQL();

  const fields = rootType.getFields();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // console.log('rendering RootType', {
  //   operationDefinition,
  // });

  const handleToggleField = ({ input }: { input: EditFieldAction }) => {
    // console.log('running handleToggleField', {
    //   input,
    // });

    //TODO 👇 totally wonky, fix ASAP
    const nextVariableDefinitions = (() => {
      if (input.type === 'addField') {
        let newVariableDefinitions: VariableDefinitionNode[] | null = null;
        if (input.payloads.args.some((arg) => isRequiredArgument(arg))) {
          newVariableDefinitions = getVariableDefinitionsForField({
            field: input.payloads,
            onlyRequired: true,
          });
        }
        if (!newVariableDefinitions) {
          return undefined;
        } else {
          return operationDefinition?.variableDefinitions
            ? [...operationDefinition?.variableDefinitions, ...newVariableDefinitions]
            : [...newVariableDefinitions];
        }
      }

      if (input.type === 'removeField') {
        // TODO: this seems fragile!
        return operationDefinition?.variableDefinitions?.filter((vd) => {
          return !vd.variable.name.value.includes(input.payloads.name);
        });
      }

      if (input.type === 'updateField') {
        if (input.payloads.variableNameToRemove) {
          return operationDefinition?.variableDefinitions?.filter((vd) => {
            return !vd.variable.name.value.includes(
              input.payloads.variableNameToRemove as string
            );
          });
        }
        if (input.payloads.newVariableDefinition) {
          return operationDefinition?.variableDefinitions
            ? [
                ...operationDefinition?.variableDefinitions,
                input.payloads.newVariableDefinition,
              ]
            : [input.payloads.newVariableDefinition];
        }
      }

      return undefined;
    })();

    const selections = editFieldSelection({
      original: operationDefinition?.selectionSet.selections || [],
      action: input,
    });

    const nextDefinition: OperationDefinitionNode = {
      ...((operationDefinition
        ? operationDefinition
        : {
            kind: Kind.OPERATION_DEFINITION,
            // TODO:
            operation: rootType.name === 'Mutation' ? 'mutation' : 'query',
            name: {
              kind: Kind.NAME,
              value: 'ExampleQuery',
            },
          }) as OperationDefinitionNode),
      variableDefinitions:
        nextVariableDefinitions ?? operationDefinition?.variableDefinitions,
      selectionSet: {
        kind: Kind.SELECTION_SET,
        selections,
      },
    };

    if (selections.length) {
      onEditDefinition({ nextDefinition });
    } else {
      onEditDefinition({ nextDefinition: null });
    }
  };

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
              field={fields[field]}
              onEdit={handleToggleField}
              selectionSet={operationDefinition?.selectionSet}
            />
          ))}
      </Content>
    </RootWrap>
  );
};
