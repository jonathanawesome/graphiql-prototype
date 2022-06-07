/** components */
import { Prettier } from '../../../icons';

/** hooks */
import { useGraphiQL } from '../../../hooks';

/** styles */
import { PrettierButtonStyled } from './styles';

export const PrettierButton = () => {
  const { editors } = useGraphiQL();

  const operationsEditor = editors.find((e) => e.name === 'operations');

  return (
    <PrettierButtonStyled
      onClick={() => {
        operationsEditor?.editor.getAction('editor.action.formatDocument').run();
      }}
    >
      <Prettier />
    </PrettierButtonStyled>
  );
};
