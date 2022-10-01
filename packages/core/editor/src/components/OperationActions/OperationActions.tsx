import { useEffect, useState } from 'react';

// components
import { Icon, Play, Prettier } from '@graphiql-prototype/ui-library';

// hooks
import { useEditor } from '@graphiql-prototype/use-editor';
import { useSchema } from '@graphiql-prototype/use-schema';

// styles
import {
  StyledOperationActions,
  StyledPlayButton,
  StyledPrettierButton,
  StyledWarningButton,
} from './styles';

// utils
import { parseQuery } from '@graphiql-prototype/utils';

export const OperationActions = () => {
  const {
    getActiveTab,
    monacoEditors,
    splitMultipleOperationsToSeparateTabs,
    // warningWhenMultipleOperations,
  } = useEditor();

  const [warningWhenMultipleOperations, setWarningWhenMultipleOperations] =
    useState<boolean>(false);

  const { executeOperation } = useSchema();

  const operationEditor = monacoEditors.operations;

  // const opsModelValue = getActiveTab().operationsModel.getValue();

  // useEffect(() => {
  //   if (opsModelValue) {
  //     const parsedQuery = parseQuery(opsModelValue);

  //     // console.log('updateOperationDefinitionFromModelValue', { value, parsedQuery });

  //     if (!(parsedQuery instanceof Error)) {
  //       // console.log('parsedQuery', { parsedQuery });

  //       setWarningWhenMultipleOperations(
  //         (parsedQuery?.definitions && parsedQuery.definitions.length > 1) || false
  //       );
  //     }
  //   }
  // }, [opsModelValue]);

  return (
    <StyledOperationActions>
      <StyledPlayButton
        onClick={() => {
          executeOperation();
        }}
      >
        <Play />
      </StyledPlayButton>
      <StyledPrettierButton
        onClick={() => operationEditor?.getAction('editor.action.formatDocument').run()}
      >
        <Prettier />
      </StyledPrettierButton>
      {warningWhenMultipleOperations && (
        <StyledWarningButton
          onClick={() => splitMultipleOperationsToSeparateTabs()}
          title={`Split multiple operations into separate tabs`}
        >
          <Icon name="SplitToTabs" />
        </StyledWarningButton>
      )}
    </StyledOperationActions>
  );
};
