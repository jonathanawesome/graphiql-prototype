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
          <div key={a.name} className={StyledArgWrap({ showBorder, showDescription })}>
            <div className={StyledArg()}>
              {isInputObjectType(a.type) ? (
                <span className={StyledInputObjectName()}>{a.name}</span>
              ) : (
                <span className={StyledScalarArgumentName()}>{a.name}</span>
              )}
              <span className={StyledDelimiter()}>:</span>
              <button
                className={StyledReturnType()}
                onClick={() =>
                  setActiveTertiaryPane({
                    destinationPane: unwrapType(a.type),
                    reset: resetTertiaryPaneOnClick,
                  })
                }
              >
                {a.type.toString()}
              </button>
              <DefaultValue inputFieldOrArgument={a} />
            </div>
            {showDescription && a.description && (
              <Markdown content={a.description} showSummary={true} />
            )}
          </div>
        ))}
      </>
    );
  }
};
