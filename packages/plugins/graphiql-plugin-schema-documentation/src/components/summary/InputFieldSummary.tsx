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
    <StyledFieldSummary>
      <StyledScalarArgumentName>{inputField.name}</StyledScalarArgumentName>
      <StyledDelimiter>:</StyledDelimiter>
      <StyledReturnType
        title="Return type"
        onClick={() =>
          setActiveTertiaryPane({ destinationPane: unwrapType(inputField.type) })
        }
      >
        {inputField.type.toString()}
      </StyledReturnType>
      <DefaultValue inputFieldOrArgument={inputField} />
      {inputField.description && (
        <Markdown content={inputField.description} showSummary={false} />
      )}
    </StyledFieldSummary>
  );
};
