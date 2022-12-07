import { astFromValue, GraphQLArgument, GraphQLInputField, print } from 'graphql';

// styles
import { StyledDefaultValue, StyledDelimiter } from './styles';

export const DefaultValue = ({
  inputFieldOrArgument,
}: {
  inputFieldOrArgument: GraphQLInputField | GraphQLArgument;
}) => {
  const defaultValue = () => {
    if (inputFieldOrArgument.defaultValue !== undefined) {
      const ast = astFromValue(
        inputFieldOrArgument.defaultValue,
        inputFieldOrArgument.type
      );
      if (!ast) {
        return null;
      }
      return print(ast);
    }
    return null;
  };

  const dVal = defaultValue();

  if (!dVal) {
    return null;
  }

  return (
    <>
      {dVal && (
        <>
          <span className={StyledDelimiter()}>=</span>
          <span className={StyledDefaultValue()} title="Default value">
            {dVal}
          </span>
        </>
      )}
    </>
  );
};
