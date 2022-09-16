import { GraphQLArgument, isEnumType, isListType, OperationTypeNode } from 'graphql';

// components
// import { ListItem } from '../ListItem';
import { Control, HandleChangeSignature } from '../Control';

// hooks
import {
  AncestorArgument,
  AncestorInputField,
  AncestorMap,
  usePathfinder,
} from '../../hooks';
// import { NewForm } from '@graphiql-prototype/ui-library';
import { useEffect, useState } from 'react';

// utils
import { unwrapType, getEnumValues } from '@graphiql-prototype/utils';

// styles
import { StyledScalarArgWrap } from './styles';
import { useEditor } from '@graphiql-prototype/use-editor';
import { capitalize, generateVariableNameFromAncestorMap } from '../../utils';

export const ScalarArg = ({
  ancestors,
  argument,
  operationType,
}: {
  ancestors: AncestorMap;
  argument: GraphQLArgument;
  operationType: OperationTypeNode;
}) => {
  const ancestor = ancestors.values().next().value as
    | AncestorArgument
    | AncestorInputField;

  const isSelected = !!ancestor.selection;

  const [formValues, setFormValues] = useState<Record<any, string>>({});
  const [variableIsSet, setVariableIsSet] = useState<boolean>(false);

  const { toggle } = usePathfinder();
  const { updateVariable, getVariables } = useEditor();

  const [value, setValue] = useState<string | string[]>(
    isListType(argument.type) ? [] : ``
  );

  const handleChange: HandleChangeSignature = ({ name, value }) => {
    setValue(value);
    console.log('handleChange in ScalarArg', { name, value });
  };

  // useEffect(() => {
  //   console.log('ScalarArg', {
  //     variableIsSet,
  //     // ancestors,
  //     // argument,
  //     // formValues,
  //     // activeVariables: getVariables(),
  //     variableName: `${generateVariableNameFromAncestorMap({ ancestors })}`,
  //     0: Object.values(formValues),
  //     // l: Object.values(formValues)[0].length,
  //   });
  //   if (
  //     !variableIsSet &&
  //     Object.values(formValues)[0] &&
  //     Object.values(formValues)[0].length > 0
  //   ) {
  //     toggle({ ancestors, operationType });
  //     setVariableIsSet(true);
  //   }
  //   if (
  //     variableIsSet &&
  //     Object.values(formValues)[0] &&
  //     Object.values(formValues)[0].length === 0
  //   ) {
  //     toggle({ ancestors, operationType });
  //     setVariableIsSet(false);
  //   }
  //   updateVariable({
  //     variableName: Object.keys(formValues)[0],
  //     variableValue: Object.values(formValues)[0],
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formValues]);

  let toRender: React.ReactElement = <></>;

  if (isListType(argument.type)) {
    if (unwrapType(argument.type).toString() === 'Boolean') {
      console.log('is list type', { isbool: unwrapType(argument.type).toString() });
      toRender = (
        <Control
          control={{
            controlType: 'SELECT',
            handleChange,
            name: argument.name,
            options: [
              { name: 'True', value: 'true' },
              { name: 'False', value: 'false' },
            ],
            placeholder: `A boolean Select`,
            returnType: 'Boolean',
            value,
          }}
          labelCopy={argument.name}
          list={true}
        />
      );
    } else if (isEnumType(unwrapType(argument.type))) {
      toRender = (
        <Control
          control={{
            controlType: 'SELECT',
            handleChange,
            name: argument.name,
            options:
              getEnumValues({
                enumTypeName: unwrapType(argument.type).toString(),
              }) || [],
            placeholder: `Select ${argument.type.toString()}`,
            returnType: unwrapType(argument.type).toString(),
            value,
          }}
          labelCopy={argument.name}
          list={true}
        />
      );
    } else {
      toRender = (
        <Control
          control={{
            controlType: 'INPUT',
            handleChange,
            name: argument.name,
            placeholder: `A List Input`,
            returnType: unwrapType(argument.type).toString(),
            value,
          }}
          labelCopy={argument.name}
          list={true}
        />
      );
    }
  } else if (isEnumType(argument.type)) {
    toRender = (
      <Control
        control={{
          controlType: 'SELECT',
          handleChange,
          name: argument.name,
          options:
            getEnumValues({
              enumTypeName: argument.type.name,
            }) || [],
          placeholder: `Select ${argument.type.name}`,
          returnType: argument.type.name,
          value,
        }}
        labelCopy={argument.name}
        list={false}
      />
    );
  } else {
    // default to input string
    toRender = (
      <Control
        control={{
          controlType: 'INPUT',
          handleChange,
          name: argument.name,
          placeholder: `An Input`,
          returnType: argument.type.toString(),
          value,
        }}
        labelCopy={argument.name}
        list={false}
      />
      // <ListItem
      //   isSelected={isSelected}
      //   toggler={{
      //     ancestors,
      //     fieldOrArgumentName: argument.name,
      //     isSelected,
      //     operationType,
      //     variant: 'ARGUMENT',
      //   }}
      //   type={argument}
      //   variant="ARGUMENT"
      // />
    );
  }

  return <StyledScalarArgWrap>{toRender}</StyledScalarArgWrap>;
};
