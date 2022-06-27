import {
  isSchema,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isInputObjectType,
  isEnumType,
} from 'graphql';

// components
import { ChevronSmall } from '@graphiql-v2-prototype/graphiql-ui-library';
import { unwrapType } from '@graphiql-v2-prototype/graphiql-utils';

// hooks
import { DocPlacement, useDocs } from '../../hooks';

// styles
import { BackButton, CurrentTypeName, DocsLeadStyled, Left } from './styles';

export const DocsLead = ({ placement }: { placement: DocPlacement }) => {
  const { getDocsInstance, navigateBack } = useDocs();

  const docsInstance = getDocsInstance({ placement });

  const previousPane = docsInstance?.docPanes[docsInstance?.docPanes.length - 2];
  const activeDocPane = docsInstance?.activeDocPane;
  const docPanes = docsInstance?.docPanes;

  // console.log('DocsLead', {
  //   docPanes: docsInstance?.docPanes,
  //   activeDocPane: docsInstance?.activeDocPane,
  //   previousPane,
  // });

  let pillCopy = 'defaultPillCopy';

  if (activeDocPane) {
    if (isSchema(activeDocPane.type)) {
      pillCopy = 'Schema';
    } else {
      const unwrappedType = unwrapType(activeDocPane.type);
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
    <DocsLeadStyled>
      <Left>
        {docPanes && docPanes.length > 1 && (
          <BackButton
            onClick={() => {
              navigateBack({ placement });
            }}
          >
            <ChevronSmall />
            <span>{previousPane?.name}</span>
          </BackButton>
        )}
        <CurrentTypeName>
          <span>{activeDocPane?.name}</span>
          <span>{pillCopy}</span>
        </CurrentTypeName>
      </Left>
    </DocsLeadStyled>
  );
};
