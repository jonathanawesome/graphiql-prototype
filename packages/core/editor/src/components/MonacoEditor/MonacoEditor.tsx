import { useEffect, useRef } from 'react';
import { editor as MONACO_EDITOR } from 'monaco-editor';

// hooks
import { MonacoEditorTypes, useEditor } from '@graphiql-prototype/use-editor';

// styles
import { MonacoEditorStyled, MonacoWrap } from './styles';

const initMonacoEditor = useEditor.getState().initMonacoEditor;

export const MonacoEditor = ({
  monacoEditorType,
  optionOverrides,
}: {
  monacoEditorType: MonacoEditorTypes;
  optionOverrides?: MONACO_EDITOR.IStandaloneEditorConstructionOptions;
}) => {
  const monacoEditorRef = useRef<HTMLDivElement>(null);

  // console.log('rendering MonacoEditor', {
  //   monacoEditorRef,
  // });

  useEffect(() => {
    initMonacoEditor({
      monacoEditorType,
      monacoEditorRef: monacoEditorRef.current as unknown as HTMLDivElement,
      optionOverrides,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MonacoEditorStyled>
      <MonacoWrap ref={monacoEditorRef} />
    </MonacoEditorStyled>
  );
};