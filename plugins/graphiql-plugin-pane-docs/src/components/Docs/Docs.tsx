import {
  GraphQLNamedType,
  GraphQLType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
  isSchema,
  isUnionType,
} from 'graphql';

// components
import {
  ChevronSmall,
  // Close
} from '@graphiql-v2-prototype/graphiql-ui-library';
import { Enum } from '../Enum';
import { InputObject } from '../InputObject';
import { Interface } from '../Interface';
import { ObjectType } from '../ObjectType';
import { Scalar } from '../Scalar';
import { Union } from '../Union';

// hooks
import { useDocs } from '../../hooks';

// styles
import {
  BackButton,
  DocsStyled,
  // CloseButton,
  CurrentTypeName,
  Flex,
  Left,
  // Right,
} from './styles';

// utils
import { unwrapType } from '@graphiql-v2-prototype/graphiql-utils';
import { useGraphiQLEditor } from '@graphiql-v2-prototype/graphiql-editor';
import { DocsPane } from '../DocsPane';
import { useEffect } from 'react';

export const Docs = () => {
  const { currentType, previousTypes, setCurrentType, setPreviousTypes } = useDocs();

  const { schema } = useGraphiQLEditor();

  useEffect(() => {
    if (schema && !('error' in schema)) {
      setCurrentType({ currentType: schema });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema]);

  const type = currentType;

  let unwrappedType: GraphQLNamedType | null = null;

  console.log('DocsOverlay', {
    // overlay,
    type,
  });

  let pillCopy = 'defaultPillCopy';

  if (currentType) {
    if (isSchema(currentType)) {
      pillCopy = 'Schema';
    } else {
      unwrappedType = unwrapType(currentType);
      console.log({ unwrappedType });
      if (isObjectType(unwrappedType)) {
        pillCopy = 'Object';
      } else if (isInterfaceType(unwrappedType)) {
        pillCopy = 'Interface';
      } else if (isUnionType(unwrappedType)) {
        pillCopy = 'Union';
      } else if (isInputObjectType(unwrappedType)) {
        pillCopy = 'InputObject';
      } else if (isEnumType(unwrappedType)) {
        pillCopy = 'Enum';
      } else {
        pillCopy = 'Scalar';
      }
    }
  }

  return (
    <DocsStyled>
      <Flex>
        <Left>
          {previousTypes.length > 0 && (
            <BackButton
              onClick={() => {
                setCurrentType({
                  currentType: previousTypes[previousTypes.length - 1],
                });
                setPreviousTypes({
                  previousTypes: previousTypes.filter(
                    (_, i) => i < previousTypes.length - 1
                  ),
                });
              }}
            >
              <ChevronSmall />
              <span>
                {isSchema(previousTypes[previousTypes.length - 1])
                  ? 'Schema'
                  : unwrapType(
                      previousTypes[previousTypes.length - 1] as GraphQLType
                    ).toString()}
              </span>
            </BackButton>
          )}
          <CurrentTypeName>
            <span>{isSchema(currentType) ? 'Schema' : unwrappedType?.toString()}</span>
            <span>{pillCopy}</span>
          </CurrentTypeName>
        </Left>
      </Flex>
      {currentType && <DocsPane currentType={currentType} />}
    </DocsStyled>
  );
};
