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

// styles
import { StyledInputObject } from './styles';

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

  console.log('rendering InputObject', {
    inputObjectType,
    toConfig: inputObjectType.toConfig(),
    variableName: `${generateVariableNameFromAncestorMap({ ancestors })}`,
    // ancestors,
    // previousAncestor,
  });

  return (
    <StyledInputObject>
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
                          isNested: true,
                          name: fields[f].name,
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
        // toggler={{
        //   ancestors,
        //   fieldOrArgumentName: argument.name,
        //   isSelected,
        //   operationType,
        //   variant: 'ARGUMENT',
        // }}
        type={argument}
        variant="INPUT_OBJECT"
      />
    </StyledInputObject>
  );
};
