import {
  GraphQLNamedType,
  GraphQLType,
  // isEnumType,
  // isInputObjectType,
  // isInterfaceType,
  // isObjectType,
  // isUnionType,
} from 'graphql';

// components
// import { ChevronSmall, Close } from '@graphiql-v2-prototype/graphiql-ui-library';
// import { EnumType } from './panels/EnumType';
// import { InputObjectType } from './panels/InputObjectType';
// import { InterfaceType } from './panels/InterfaceType';
// import { ObjectType } from './panels/ObjectType';
// import { ScalarType } from './panels/ScalarType';
// import { UnionType } from './panels/UnionType';

// hooks
// import { usePathfinder } from '../../hooks';

// styles
import {
  // BackButton,
  DocsOverlayStyled,
  // CloseButton,
  // CurrentTypeName,
  // Flex,
  // Left,
  // Right,
} from './styles';

// utils
// import { unwrapType } from '../../utils';

import { Docs, useDocs } from '@graphiql-v2-prototype/graphiql-plugin-pane-docs';

export const DocsOverlay = ({ overlayVisible }: { overlayVisible: boolean }) => {
  // const { overlay, setOverlay } = usePathfinder();
  const { currentType } = useDocs();

  console.log('DocsOverlay', {
    // overlay,
    // type,
  });

  return (
    <DocsOverlayStyled overlayVisible={!!currentType}>
      <Docs />
    </DocsOverlayStyled>
  );
};
