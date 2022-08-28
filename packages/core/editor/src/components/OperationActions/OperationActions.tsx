import { Play, Prettier } from '@graphiql-prototype/ui-library';
import { useEditor } from '@graphiql-prototype/use-editor';
import { useSchema } from '@graphiql-prototype/use-schema';

// styles
import { OperationActionsWrap, PlayButton, PrettierButton } from './styles';

export const OperationActions = () => {
  const { monacoEditors } = useEditor();
  const { executeOperation } = useSchema();

  const operationEditor = monacoEditors.find((e) => e.name === 'operations');

  return (
    <OperationActionsWrap>
      <PlayButton
        onClick={() => {
          executeOperation();
        }}
      >
        <Play />
      </PlayButton>
      <PrettierButton
        onClick={() =>
          operationEditor?.editor.getAction('editor.action.formatDocument').run()
        }
      >
        <Prettier />
      </PrettierButton>
    </OperationActionsWrap>
  );
};
