import { Play, Prettier } from '@graphiql-v2-prototype/graphiql-ui-library';
import { useGraphiQLEditor } from '../../hooks';

// styles
import { OperationActionsWrap, PlayButton, PrettierButton } from './styles';

export const OperationActions = () => {
  const { executeOperation, monacoEditors } = useGraphiQLEditor();

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
