import { useEffect, useRef } from 'react';
import { editor as MONACO_EDITOR } from 'monaco-editor';

// hooks
import { MonacoEditorTypes, useEditor } from '@graphiql-prototype/store';

// styles
import { StyledMonacoEditor, StyledMonacoWrap } from './styles';

const initMonacoEditor = useEditor.getState().initMonacoEditor;

export const MonacoEditor = ({
  monacoEditorType,
  optionOverrides,
}: {
  monacoEditorType: MonacoEditorTypes;
  optionOverrides?: MONACO_EDITOR.IStandaloneEditorConstructionOptions;
}) => {
  const monacoEditorRef = useRef<HTMLDivElement>(null);

  // console.log('rendering MonacoEditor', {});

  useEffect(() => {
    initMonacoEditor({
      monacoEditorType,
      monacoEditorRef: monacoEditorRef.current as unknown as HTMLDivElement,
      optionOverrides,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={StyledMonacoEditor()}>
      <div className={StyledMonacoWrap()} ref={monacoEditorRef} />
    </div>
  );
};
