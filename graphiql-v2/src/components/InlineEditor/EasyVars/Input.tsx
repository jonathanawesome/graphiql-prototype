import { styled } from '../../../theme';

/** hooks */
import { useGraphiQL } from '../../../hooks';
import React, { useRef } from 'react';
import { GraphQLInputType } from 'graphql';

const StyledInput = styled('div', {
  width: '100%',
  input: {
    all: 'unset',
    boxSizing: 'border-box',
    width: '100%',
    textAlign: 'right',
    padding: 4,
    // marginRight: 12,
    color: '$accentWarning',
  },
});

const updateVariable = useGraphiQL.getState().updateVariable;

export const Input = ({
  variableName,
  unwrappedTypeName,
}: {
  variableName: string;
  unwrappedTypeName: string;
}) => {
  console.log('rendering Input', {
    variableName,
    unwrappedTypeName,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (inputRef?.current?.value) {
      updateVariable({ variableName, variableValue: inputRef.current.value });
    }
  };

  const defaultValue = () => {
    console.log('unwrappedTypeName', unwrappedTypeName);
    switch (unwrappedTypeName) {
      case 'Float':
        return '1.23';
      case 'Int':
        return '123';
      case 'ID':
        return 'cl3mbj6ta002z3e0wfn017z27';
      case 'String':
        return 'meowwoof';
      default:
        return 'Whoops...';
    }
  };

  return (
    <StyledInput>
      <input
        autoComplete="off"
        name={variableName}
        onChange={() => handleChange()}
        ref={inputRef}
        type="text"
        value={defaultValue()}
      />
    </StyledInput>
  );
};
