import { Play, Prettier } from '@graphiql-v2-prototype/graphiql-ui-library';
import { useGraphiQLScout } from '../../hooks';

/** styles */
import { OperationActionsWrap, PlayButton, PrettierButton } from './styles';

export const OperationActions = () => {
  const { executeOperation } = useGraphiQLScout();
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
        onClick={() => {
          // operationsEditor?.editor.getAction('editor.action.formatDocument').run();
        }}
      >
        <Prettier />
      </PrettierButton>
    </OperationActionsWrap>
  );
};
