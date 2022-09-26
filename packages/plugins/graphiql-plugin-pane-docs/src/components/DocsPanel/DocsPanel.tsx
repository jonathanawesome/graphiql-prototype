import { useEffect, useState } from 'react';

import {
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isObjectType,
  isSchema,
  isUnionType,
} from 'graphql';

// components
import { Enum } from '../Enum';
import { InputObject } from '../InputObject';
import { Interface } from '../Interface';
import { ObjectType } from '../ObjectType';
import { Scalar } from '../Scalar';
import { Schema } from '../Schema';
import { Union } from '../Union';

// hooks
import { DocPane, DocPlacement, useDocs } from '../../hooks';

// utils
import { unwrapType } from '@graphiql-prototype/utils';
import { Field } from '../Field';
// import { useSchema } from '@graphiql-prototype/use-schema';

export const DocsPanel = ({ placement }: { placement: DocPlacement }) => {
  const [activePane, setActivePane] = useState<DocPane | null>(null);

  const { getDocsInstance } = useDocs();
  // const { schema } = useSchema();

  const docsInstance = getDocsInstance({ placement });
  const activeDocPane = docsInstance?.activeDocPane;

  console.log('DocsPanel', {
    placement,
    docsInstance,
    activeDocPane,
    // fieldData: schema && !('error' in schema) && schema.getType(activeDocPane?.type),
  });

  useEffect(() => {
    if (activeDocPane) {
      setActivePane(activeDocPane);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDocPane]);

  let toRender: React.ReactElement = <></>;

  if (activePane && 'args' in activePane.type) {
    // this is a field
    toRender = <Field field={activePane?.type} />;
  } else if (activePane?.type) {
    if (isSchema(activePane.type)) {
      toRender = <Schema placement={placement} schema={activePane.type} />;
    } else {
      const unwrappedType = unwrapType(activePane.type);
      if (isObjectType(unwrappedType)) {
        toRender = <ObjectType placement={placement} type={unwrappedType} />;
      } else if (isInterfaceType(unwrappedType)) {
        toRender = <Interface placement={placement} type={unwrappedType} />;
      } else if (isUnionType(unwrappedType)) {
        toRender = <Union placement={placement} type={unwrappedType} />;
      } else if (isInputObjectType(unwrappedType)) {
        toRender = <InputObject placement={placement} type={unwrappedType} />;
      } else if (isEnumType(unwrappedType)) {
        toRender = <Enum type={unwrappedType} />;
      } else {
        toRender = <Scalar type={unwrappedType} />;
      }
    }
  }

  return <>{toRender}</>;
};
