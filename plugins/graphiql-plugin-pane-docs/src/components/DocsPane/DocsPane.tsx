import {
  GraphQLType,
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

// utils
import { unwrapType } from '@graphiql-v2-prototype/graphiql-utils';

// types
import { DocsTypes } from '../../hooks/useDocs';

export const DocsPane = ({ currentType }: { currentType: DocsTypes }) => {
  let toRender: React.ReactElement = <></>;

  if (isSchema(currentType)) {
    toRender = <Schema schema={currentType} />;
  } else {
    const unwrappedType = unwrapType(currentType);
    console.log({ unwrappedType });
    if (isObjectType(unwrappedType)) {
      toRender = <ObjectType type={unwrappedType} />;
    } else if (isInterfaceType(unwrappedType)) {
      toRender = <Interface type={unwrappedType} />;
    } else if (isUnionType(unwrappedType)) {
      toRender = <Union type={unwrappedType} />;
    } else if (isInputObjectType(unwrappedType)) {
      toRender = <InputObject type={unwrappedType} />;
    } else if (isEnumType(unwrappedType)) {
      toRender = <Enum type={unwrappedType} />;
    } else {
      toRender = <Scalar type={unwrappedType} />;
    }
  }

  return <>{toRender}</>;
};
