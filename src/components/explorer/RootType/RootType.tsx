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
import { useOperation } from '@/hooks';

/** styles */
import { Content, Root as RootWrap, Trigger } from './styles';

/** types */
import { EditFieldAction } from '@/types';

/** utils */
import {
  buildVariableNameValue,
  editFieldSelection,
  generateAndSetEasyVariable,
  getRequiredVariableDefinitionsForField,
  unwrapInputType,
} from '@/utils';

export const RootType = ({
  rootType,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rootType: GraphQLObjectType<any, any>;
}) => {
  const { onEditDefinition, operationDefinition } = useOperation();

  const varDefs = operationDefinition?.variableDefinitions;

  const fields = rootType.getFields();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  console.log('rendering RootType', {
    operationDefinition,
  });

  const handleToggleField = ({ input }: { input: EditFieldAction }) => {
    console.log('running handleToggleField', {
      input,
    });

    //TODO 👇 totally wonky, fix ASAP
    const nextVarDefs = (() => {
      if (input.type === 'addField') {
        // if we're adding a field, we need to set _required_ variable definitions
        let newVarDefs: VariableDefinitionNode[] | null = null;

        if (input.payloads.args.length > 0) {
          // get the required variable definitions ... done with var defs
          newVarDefs = getRequiredVariableDefinitionsForField({
            field: input.payloads,
          });

          input.payloads.args.forEach((arg) => {
            if (isRequiredArgument(arg)) {
              // if this arg is required, we need to set the easy Variable
              generateAndSetEasyVariable({
                variableName: buildVariableNameValue({
                  fieldName: input.payloads.name,
                  parentArgName: null,
                  argName: arg.name,
                }),
                unwrappedType: unwrapInputType({ inputType: arg.type }),
              });
            }
          });
        }

        // if (input.payloads.args.some((arg) => isRequiredArgument(arg))) {
        //   // console.log("let's set these variables:", JSON.stringify(vars, null, 2));
        //   // setEasyVariables({ value: 'something' });
        //   newVarDefs = getRequiredVariableDefinitionsForField({
        //     field: input.payloads,
        //   });
        // }

        if (newVarDefs) {
          // // console.log({ newVarDefs });
          // // const argForNVD = input.payloads.a
          // const easyVars: EasyVariable[] = [];
          // newVarDefs.forEach((nVD) => {
          //   console.log({ nVD, args: input.payloads.args });
          //   // easyVars.push({ [nVD.variable.name.value]: ['as', 123] });
          // });

          return varDefs ? [...varDefs, ...newVarDefs] : [...newVarDefs];
        } else {
          return undefined;
        }
      }

      if (input.type === 'removeField') {
        // TODO: this seems fragile!
        return varDefs?.filter((vd) => {
          return !vd.variable.name.value.includes(input.payloads.name);
        });
      }

      if (input.type === 'updateField') {
        console.log(
          'newVariableDefinition in RootType',
          input.payloads.newVariableDefinition
        );
        if (input.payloads.variableNameToRemove) {
          return varDefs?.filter((vd) => {
            return !vd.variable.name.value.includes(
              input.payloads.variableNameToRemove as string
            );
          });
        }
        if (input.payloads.newVariableDefinition) {
          return varDefs
            ? [...varDefs, input.payloads.newVariableDefinition]
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
      variableDefinitions: nextVarDefs ?? varDefs,
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
