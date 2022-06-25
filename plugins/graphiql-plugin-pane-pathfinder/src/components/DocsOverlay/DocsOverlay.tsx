import {
  GraphQLNamedType,
  GraphQLType,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
  isUnionType,
} from 'graphql';

// components
import { Chevron, Close } from '@graphiql-v2-prototype/graphiql-ui-library';
import { EnumType } from './panels/EnumType';
import { InputObjectType } from './panels/InputObjectType';
import { InterfaceType } from './panels/InterfaceType';
import { ObjectType } from './panels/ObjectType';
import { ScalarType } from './panels/ScalarType';
import { UnionType } from './panels/UnionType';

// hooks
import { usePathfinder } from '../../hooks';

// styles
import {
  BackButton,
  DocsOverlayStyled,
  CloseButton,
  CurrentTypeName,
  Flex,
  Left,
  Right,
} from './styles';

// utils
import { unwrapType } from '../../utils';

export const DocsOverlay = ({ overlayVisible }: { overlayVisible: boolean }) => {
  const { overlay, setOverlay } = usePathfinder();

  const type = overlay.currentType as GraphQLType;
  const prevTypes = overlay.prevTypes;

  let unwrappedType: GraphQLNamedType | null = null;

  console.log('DocsOverlay', {
    overlay,
    type,
  });

  let toRender: React.ReactElement = <></>;
  let pillCopy = 'defaultPillCopy';

  if (overlay.currentType) {
    unwrappedType = unwrapType(overlay.currentType);
    console.log({ unwrappedType });
    if (isObjectType(unwrappedType)) {
      toRender = <ObjectType objectType={unwrappedType} />;
      pillCopy = 'Object';
    } else if (isInterfaceType(unwrappedType)) {
      toRender = <InterfaceType interfaceType={unwrappedType} />;
      pillCopy = 'Interface';
    } else if (isUnionType(unwrappedType)) {
      toRender = <UnionType unionType={unwrappedType} />;
      pillCopy = 'Union';
    } else if (isInputObjectType(unwrappedType)) {
      toRender = <InputObjectType inputObjectType={unwrappedType} />;
      pillCopy = 'InputObject';
    } else if (isEnumType(unwrappedType)) {
      toRender = <EnumType enumType={unwrappedType} />;
      pillCopy = 'Enum';
    } else {
      toRender = <ScalarType scalarType={unwrappedType} />;
      pillCopy = 'Scalar';
    }
  }

  return (
    <DocsOverlayStyled overlayVisible={overlayVisible}>
      <Flex>
        <Left>
          {prevTypes.length > 0 && (
            <BackButton
              onClick={() =>
                setOverlay({
                  currentType: prevTypes[prevTypes.length - 1],
                  prevTypes: prevTypes.filter((_, i) => i < prevTypes.length - 1),
                  visible: true,
                })
              }
            >
              <Chevron />
              <span>{unwrapType(prevTypes[prevTypes.length - 1]).toString()}</span>
            </BackButton>
          )}
          <CurrentTypeName>
            <span>{unwrappedType?.toString()}</span>
            <span>{pillCopy}</span>
          </CurrentTypeName>
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
      {toRender}
    </DocsOverlayStyled>
  );
};
