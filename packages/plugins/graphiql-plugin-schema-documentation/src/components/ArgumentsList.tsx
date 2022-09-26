import { GraphQLArgument, isInputObjectType } from 'graphql';

// components
import { DefaultValue } from './DefaultValue';
import { Markdown } from '@graphiql-prototype/ui-library';

// hooks
import { useSchemaReference } from '../hooks';

// styles
import {
  StyledArg,
  StyledArgWrap,
  StyledDelimiter,
  StyledInputObjectName,
  StyledReturnType,
  StyledScalarArgumentName,
} from './styles';

// utils
import { unwrapType } from '@graphiql-prototype/utils';

export const ArgumentsList = ({
  args,
  resetTertiaryPaneOnClick,
  showBorder = false,
  showDescription = false,
}: {
  args: readonly GraphQLArgument[];
  resetTertiaryPaneOnClick: boolean;
  showBorder?: boolean;
  showDescription?: boolean;
}) => {
  // console.log('ArgumentsList', { args });

  const { setActiveTertiaryPane } = useSchemaReference();

  if (args.length < 1) {
    return null;
  } else {
    return (
      <>
        {args.map((a) => (
          <StyledArgWrap
            key={a.name}
            showBorder={showBorder}
            showDescription={showDescription}
          >
            <StyledArg>
              {isInputObjectType(a.type) ? (
                <StyledInputObjectName>{a.name}</StyledInputObjectName>
              ) : (
                <StyledScalarArgumentName>{a.name}</StyledScalarArgumentName>
              )}
              <StyledDelimiter>:</StyledDelimiter>
              <StyledReturnType
                onClick={() =>
                  setActiveTertiaryPane({
                    destinationPane: unwrapType(a.type),
                    reset: resetTertiaryPaneOnClick,
                  })
                }
              >
                {a.type.toString()}
              </StyledReturnType>
              <DefaultValue inputFieldOrArgument={a} />
            </StyledArg>
            {showDescription && a.description && (
              <Markdown content={a.description} showSummary={true} />
            )}
          </StyledArgWrap>
        ))}
      </>
    );
  }
};
