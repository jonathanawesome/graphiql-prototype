import cuid from 'cuid';

import {
  GraphQLArgument,
  GraphQLInputObjectType,
  isInputObjectType,
  ObjectValueNode,
  OperationTypeNode,
} from 'graphql';

// components
import { ListItem, ScalarArg } from '../index';

// hooks
import {
  AncestorArgument,
  AncestorInputField,
  AncestorInputObject,
  AncestorMap,
} from '../../hooks';

// utils
import { capitalize, generateVariableNameFromAncestorMap } from '../../utils';

export const InputObject = ({
  ancestors,
  argument,
  inputObjectType,
  operationType,
}: {
  ancestors: AncestorMap;
  argument: GraphQLArgument;
  inputObjectType: GraphQLInputObjectType;
  operationType: OperationTypeNode;
}) => {
  const hash = cuid.slug();

  const fields = inputObjectType.getFields();

  const previousAncestor = ancestors.values().next().value as
    | AncestorArgument
    | AncestorInputObject;

  const isSelected = !!previousAncestor.selection;

  // console.log('rendering InputObject', {
  //   inputObjectType,
  //   ancestors,
  //   previousAncestor,
  // });

  return (
    <ListItem
      collapsibleContent={{
        arguments: Object.keys(fields).map((f) => {
          if (isInputObjectType(fields[f].type)) {
            // rendering nested InputObject
            return (
              <InputObject
                key={fields[f].name}
                ancestors={
                  new Map([
                    [
                      // hash = safety first!
                      `${fields[f].name}-${hash}`,
                      {
                        inputObject: fields[f].type,
                        name: fields[f].name,
                        parentType: 'INPUT_OBJECT',
                        selection: previousAncestor.selection
                          ? (
                              previousAncestor.selection.value as ObjectValueNode
                            ).fields.find((x) => x.name.value === fields[f].name)
                          : null,
                      } as AncestorInputObject,
                    ],
                    ...ancestors,
                  ])
                }
                argument={argument}
                inputObjectType={fields[f].type as GraphQLInputObjectType}
                operationType={operationType}
              />
            );
          } else {
            return (
              <ScalarArg
                key={fields[f].name}
                ancestors={
                  new Map([
                    [
                      `${fields[f].name}-${hash}`,
                      {
                        inputField: fields[f],
                        parentInputObject: inputObjectType,
                        selection: previousAncestor.selection
                          ? (
                              previousAncestor.selection?.value as ObjectValueNode
                            ).fields?.find((x) => x.name.value === f)
                          : null,
                        variableName: `${generateVariableNameFromAncestorMap({
                          ancestors,
                        })}${capitalize(fields[f].name)}`,
                      } as AncestorInputField,
                    ],
                    ...ancestors,
                  ])
                }
                argument={fields[f]}
                operationType={operationType}
              />
            );
          }
        }),
      }}
      isSelected={isSelected}
      type={argument}
      variant="ARGUMENT"
    />
  );
};
