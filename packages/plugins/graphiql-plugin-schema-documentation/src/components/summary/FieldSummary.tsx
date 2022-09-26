import { GraphQLField } from 'graphql';

// components
import { ArgumentsList } from '../ArgumentsList';

// hooks
import { useSchemaReference } from '../../hooks';

// styles
import {
  StyledDelimiter,
  StyledFieldSummary,
  StyledFieldPaneArgumentsList,
  StyledTertiaryTrigger,
  StyledReturnType,
} from '../styles';

// utils
import { unwrapType } from '@graphiql-prototype/utils';

export const FieldSummary = ({
  field,
  resetTertiaryPaneOnClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any, any>;
  resetTertiaryPaneOnClick: boolean;
}) => {
  // console.log('FieldSummary', {
  //   field,
  // });

  const { setActiveTertiaryPane } = useSchemaReference();

  return (
    <StyledFieldSummary>
      <StyledTertiaryTrigger
        color="VIOLET"
        onClick={() =>
          setActiveTertiaryPane({
            destinationPane: field,
            reset: resetTertiaryPaneOnClick,
          })
        }
      >
        {field.name}
      </StyledTertiaryTrigger>
      {'args' in field && field.args.length > 0 && (
        <>
          <StyledDelimiter>{`(`}</StyledDelimiter>
          <StyledFieldPaneArgumentsList>
            <ArgumentsList
              args={field.args}
              resetTertiaryPaneOnClick={resetTertiaryPaneOnClick}
            />
          </StyledFieldPaneArgumentsList>
          <StyledDelimiter>{`)`}</StyledDelimiter>
        </>
      )}
      <StyledDelimiter>:</StyledDelimiter>
      <StyledReturnType
        onClick={() =>
          setActiveTertiaryPane({
            destinationPane: unwrapType(field.type),
            reset: resetTertiaryPaneOnClick,
          })
        }
      >
        {field.type.toString()}
      </StyledReturnType>
    </StyledFieldSummary>
  );
};
