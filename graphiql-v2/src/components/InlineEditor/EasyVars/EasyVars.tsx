import { unwrapInputType } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder/src/utils';
import {
  GraphQLEnumValue,
  isEnumType,
  isListType,
  isNonNullType,
  isRequiredArgument,
  isRequiredInputField,
} from 'graphql';
import type { EasyVar as EV, EasyVars as EVs } from '../../../hooks/useGraphiQL/types';

import { styled } from '../../../theme';
import { Input } from './Input';
import { SelectInput } from './SelectInput';

const EasyVarsStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  fontFamily: '$mono',
  fontSize: 11,
});

const EasyVarStyled = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  padding: '0 8px',
  border: '1px solid $scale400',
  borderRadius: 8,
  height: 34,

  span: {
    // fontSize: '$body',
  },
});

const NameAndType = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  height: 'inherit',
  borderRight: '1px solid $scale400',
  paddingRight: 8,
});
const Name = styled('span', {
  color: '$accentField',
});
const Type = styled('span', {
  display: 'flex',
  color: '$scale700',
  fontSize: '8px !important',
  lineHeight: 1,
  textTransform: 'uppercase',
  padding: 3,
  border: '1px solid $scale400',
  borderRadius: 2,
});

const EasyVar = ({ easyVar }: { easyVar: EV }) => {
  const unwrappedInputType = unwrapInputType({ inputType: easyVar.variableType });
  const name = easyVar.variableName;
  // let inputToRender: React.ReactElement;
  // Boolean - select
  // Enum - select
  // Float - input number
  // ID - input string
  // Int - input number
  // string - input string
  // [Boolean] - list
  // [Enum]- list
  // [Float]- list
  // [ID]- list
  // [Int]- list
  // [String]- list
  let inputToRender: React.ReactElement;
  if (isListType(easyVar.variableType)) {
    // rendering top-level InputObject that is NOT required
    inputToRender = <p>list</p>;
  } else if (isEnumType(unwrappedInputType)) {
    const values = unwrappedInputType.getValues();
    console.log('enum values', values);
    inputToRender = (
      <SelectInput
        variableName={name}
        values={values.map((val) => ({
          value: val.value,
          name: val.name,
          description: val.description || undefined,
        }))}
      />
    );
  } else if (unwrappedInputType.name === 'Boolean') {
    inputToRender = (
      <SelectInput
        variableName={name}
        values={[
          {
            value: 'true',
            name: 'True',
          },
          {
            value: 'false',
            name: 'False',
          },
        ]}
      />
    );
  } else {
    inputToRender = (
      <Input
        variableName={easyVar.variableName}
        unwrappedTypeName={unwrappedInputType.name}
      />
    );
  }
  return (
    <>
      <EasyVarStyled>
        <NameAndType>
          <Name>{name}</Name>
          <Type>
            {unwrappedInputType.toString()}
            {isNonNullType(easyVar.variableType) && '!'}
          </Type>
        </NameAndType>
        {inputToRender}
      </EasyVarStyled>
    </>
  );
};

export const EasyVars = ({ easyVars }: { easyVars: EVs }) => {
  console.log('easyVars', easyVars);
  return (
    <EasyVarsStyled>
      {easyVars.map((eV) => (
        <EasyVar key={eV.variableName} easyVar={eV} />
      ))}
    </EasyVarsStyled>
  );
};
