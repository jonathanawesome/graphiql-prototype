import { useState } from 'react';
import cuid from 'cuid';

import {
  GraphQLInputField,
  GraphQLInputObjectType,
  isInputObjectType,
  isRequiredArgument,
  isRequiredInputField,
  ObjectValueNode,
  OperationTypeNode,
} from 'graphql';

// components
import {
  Collapser,
  // Describe,
  ScalarArg,
} from '../index';
import { DescriptionListItem } from '@graphiql-v2-prototype/graphiql-ui-library';

// components
import { Column } from '../index';

// hooks
import {
  AncestorArgument,
  AncestorInputField,
  AncestorInputObject,
  AncestorMap,
  usePathfinder,
} from '../../hooks';
import { useDocs } from '@graphiql-v2-prototype/graphiql-plugin-pane-docs';

// utils
import { capitalize, generateVariableNameFromAncestorMap, unwrapType } from '../../utils';

export const InputObject = ({
  ancestors,
  inputObjectType,
  operationType,
  renderingInputField,
}: {
  ancestors: AncestorMap;
  inputObjectType: GraphQLInputObjectType;
  operationType: OperationTypeNode;
  renderingInputField: GraphQLInputField;
}) => {
  const hash = cuid.slug();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { descriptionsVisibility } = usePathfinder();
  const { navigateForward } = useDocs();

  const fields = inputObjectType.getFields();

  const previousAncestor = ancestors.values().next().value as
    | AncestorArgument
    | AncestorInputObject;

  // console.log('rendering InputObject', {
  //   // inputObjectType and previousAncestor.inputObject are the same
  //   inputObjectType,
  //   ancestors,
  //   renderingInputField,
  //   previousAncestor,
  // });

  return (
    <Collapser
      content={
        <>
          {isExpanded && (
            <Column>
              {Object.keys(fields).map((f) => {
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
                      inputObjectType={fields[f].type as GraphQLInputObjectType}
                      operationType={operationType}
                      renderingInputField={fields[f]}
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
                      operationType={operationType}
                    />
                  );
                }
              })}
            </Column>
          )}
        </>
      }
      leadContent={
        <DescriptionListItem
          descriptionPlacement={descriptionsVisibility}
          description={inputObjectType.description || null}
          isSelected={!!previousAncestor.selection}
          name={`${renderingInputField.name}${
            isRequiredArgument(renderingInputField) ||
            isRequiredInputField(renderingInputField)
              ? `*`
              : ''
          }`}
          type={
            <button
              onClick={() => {
                navigateForward({
                  docPane: {
                    description: inputObjectType.description || null,
                    name: unwrapType(inputObjectType).toString(),
                    type: inputObjectType,
                  },
                  placement: 'PATHFINDER',
                });
              }}
            >
              {inputObjectType.toString()}
            </button>
          }
          entityType="INPUT_TYPE"
        />
      }
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
    />
  );
};
