import { useGraphiQLEditor } from '@graphiql-v2-prototype/graphiql-editor';
import { Chevron, Close } from '@graphiql-v2-prototype/graphiql-ui-library';
import { GraphQLFieldMap, GraphQLType, isObjectType } from 'graphql';
import { useEffect, useState } from 'react';

// hooks
import { usePathfinder } from '../../hooks';
import { unwrapType } from '../../utils';
import { Describe } from '../Describe';

// styles
import {
  BackButton,
  BreadcrumbOverlayStyled,
  CloseButton,
  CurrentTypeName,
  Flex,
  Left,
  Right,
} from './styles';

export const BreadcrumbOverlay = () => {
  const { overlay, setOverlay } = usePathfinder();
  const { schema } = useGraphiQLEditor();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fields, setFields] = useState<GraphQLFieldMap<any, any> | null>(null);

  const type = overlay.currentType as GraphQLType;
  const prevTypes = overlay.prevTypes;

  console.log('BreadcrumbOverlay', {
    overlay,
  });

  useEffect(() => {
    if (schema && !('error' in schema) && type) {
      const unwrappedType = unwrapType(type);
      // const getTypeResult = schema.getType(unwrappedType.toString());

      if (isObjectType(unwrappedType)) {
        setFields(unwrappedType.getFields());
      } else {
        setFields(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <BreadcrumbOverlayStyled>
      <Flex>
        <Left>
          {prevTypes.length > 0 && (
            <BackButton
              onClick={() =>
                setOverlay({
                  currentType: prevTypes[prevTypes.length - 1],
                  prevTypes: prevTypes.filter((el, i) => i < prevTypes.length - 1),
                  visible: true,
                })
              }
            >
              <Chevron />
              <span>name of prev</span>
            </BackButton>
          )}
          <CurrentTypeName>{type?.toString()}</CurrentTypeName>
        </Left>
        <Right>
          <CloseButton
            onClick={() =>
              setOverlay({ currentType: null, prevTypes: [], visible: false })
            }
          >
            <Close />
          </CloseButton>
        </Right>
      </Flex>
      {fields &&
        Object.keys(fields)
          .sort()
          .map((field) => (
            <Describe
              key={fields[field].name}
              name={fields[field].name}
              description={fields[field].description || null}
              isSelected={false}
              type={fields[field].type}
              variant="FIELD"
            />
          ))}
    </BreadcrumbOverlayStyled>
  );
};
