// components
import { Play, Prettier } from '@graphiql-prototype/ui-library';

// hooks
import { useEditor } from '@graphiql-prototype/use-editor';
import { useSchema } from '@graphiql-prototype/use-schema';

// styles
import { StyledOperationActions, PlayButton, PrettierButton } from './styles';

export const OperationActions = () => {
  const { monacoEditors } = useEditor();
  const { executeOperation } = useSchema();

  const operationEditor = monacoEditors.operations;

  return (
    <StyledOperationActions>
      <PlayButton
        onClick={() => {
          executeOperation();
        }}
      >
        <Play />
      </PlayButton>
      <PrettierButton
        onClick={() => operationEditor?.getAction('editor.action.formatDocument').run()}
      >
        <Prettier />
      </PrettierButton>
    </StyledOperationActions>
  );
};
