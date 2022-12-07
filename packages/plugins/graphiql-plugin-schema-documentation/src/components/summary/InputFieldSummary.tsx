import { GraphQLInputField } from 'graphql';

// components
import { DefaultValue } from '../DefaultValue';
import { Markdown } from '@graphiql-prototype/ui-library';

// hooks
import { useSchemaReference } from '../../hooks';

// styles
import {
  StyledDelimiter,
  StyledFieldSummary,
  StyledReturnType,
  StyledScalarArgumentName,
} from '../styles';

// utils
import { unwrapType } from '@graphiql-prototype/utils';

export const InputFieldSummary = ({ inputField }: { inputField: GraphQLInputField }) => {
  const { setActiveTertiaryPane } = useSchemaReference();

  // console.log('InputFieldSummary', {
  //   inputField,
  // });

  return (
    <div className={StyledFieldSummary()}>
      <span className={StyledScalarArgumentName()}>{inputField.name}</span>
      <span className={StyledDelimiter()}>{`:`}</span>
      <button
        className={StyledReturnType()}
        title="Return type"
        onClick={() =>
          setActiveTertiaryPane({ destinationPane: unwrapType(inputField.type) })
        }
      >
        {inputField.type.toString()}
      </button>
      <DefaultValue inputFieldOrArgument={inputField} />
      {inputField.description && (
        <Markdown content={inputField.description} showSummary={false} />
      )}
    </div>
  );
};
