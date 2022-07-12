import { Play, Prettier } from '@graphiql-prototype/graphiql-ui-library';
import { useGraphiQLEditor, useGraphiQLSchema } from '../../hooks';

// styles
import { OperationActionsWrap, PlayButton, PrettierButton } from './styles';

export const OperationActions = () => {
  const { monacoEditors } = useGraphiQLEditor();
  const { executeOperation } = useGraphiQLSchema();

  const operationEditor = monacoEditors.find((e) => e.name === 'operation');

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
