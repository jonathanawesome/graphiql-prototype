import {
  GraphQLField,
  isInputObjectType,
  isRequiredArgument,
  VariableDefinitionNode,
} from 'graphql';

// utils
import {
  buildNewVariableDefinition,
  buildVariableNameValue,
  unwrapInputType,
} from '../utils';

export const getRequiredVariableDefinitionsForField = ({
  field,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any>;
}): VariableDefinitionNode[] => {
  return field.args.flatMap((arg) => {
    if (isRequiredArgument(arg)) {
      const unwrappedInputType = unwrapInputType({ inputType: arg.type });

      if (isInputObjectType(unwrappedInputType)) {
        const inputFieldMap = unwrappedInputType.getFields();
        const requiredInputFields = Object.keys(inputFieldMap).flatMap((inputField) => {
          if (isRequiredArgument(inputFieldMap[inputField])) {
            return inputFieldMap[inputField];
          } else {
            return [];
          }
        });
        return requiredInputFields.map((requiredInputField) => {
          return buildNewVariableDefinition({
            type: requiredInputField.type,
            variableName: buildVariableNameValue({
              fieldName: field.name,
              parentArgName: arg.name,
              argName: requiredInputField.name,
            }),
          });
        });
      } else {
        return buildNewVariableDefinition({
          type: arg.type,
          variableName: buildVariableNameValue({
            fieldName: field.name,
            parentArgName: null,
            argName: arg.name,
          }),
        });
      }
    } else {
      return [];
    }
  });
};
