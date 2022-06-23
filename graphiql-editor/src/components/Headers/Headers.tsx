// components
import { MonacoEditor } from '../MonacoEditor';

// styles
import { HeadersEditor, HeadersWrap } from './styles';

export const Headers = () => {
  return (
    <HeadersWrap>
      <HeadersEditor isVisible={true}>
        <MonacoEditor editorType="headers" />
      </HeadersEditor>
    </HeadersWrap>
  );
};
