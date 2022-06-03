/** components */
import { Prettier } from '../../index';

/** hooks */
import { useGraphiQL } from '../../../hooks';

/** styles */
import { PrettierButtonStyled } from './styles';

export const PrettierButton = () => {
  const { editors } = useGraphiQL();

  const operationsEditor = editors.find((e) => e.uri === 'OPERATIONS_EDITOR_URI');

  return (
    <PrettierButtonStyled
      onClick={() => {
        // console.log('prettier button');
        //TODO: execute formatter
        operationsEditor?.editor.getAction('editor.action.formatDocument').run();
      }}
    >
      <Prettier />
    </PrettierButtonStyled>
  );
};
