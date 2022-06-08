import { useEffect, useRef } from 'react';
import { editor as MONACO_EDITOR } from 'monaco-editor';

/** constants */
// import { editorOptions } from '../../../../constants';

/** hooks */
// import { useGraphiQL } from '../../../../hooks';

/** styles */
import { EditorStyled, MonacoWrap } from './styles';

/** theme */
// import { editorTheme } from '../../../../../../graphiql-ui-library/src/theme';

// const editorType = 'operation';

export const OperationsEditor = ({
  initWithModel,
}: {
  initWithModel: MONACO_EDITOR.ITextModel;
}) => {
  const editorRef = useRef(null);
  // const { activeSurveyor, surveyors, editors, addEditor } = useGraphiQL();

  // const editor = editors.find((e) => e.name === editorType);

  // const surveyor = surveyors.find((surveyor) => surveyor.surveyorId === activeSurveyor);

  // useEffect(() => {
  //   if (surveyor && editor) {
  //     const model = editor.editor.getModel();
  //     if (model && surveyor.operation) {
  //       model.setValue(surveyor.operation);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [surveyor]);

  // console.log('rendering OperationsEditor', {
  //   editor,
  // });

  // useEffect(() => {
  //   if (!editor) {
  //     const newEditor = monacoEditor.create(
  //       editorRef.current as unknown as HTMLDivElement,
  //       {
  //         ...editorOptions, // spread our base options
  //         language: 'graphql',
  //         model: initWithModel,
  //       }
  //     );

  //     addEditor({
  //       editor: newEditor,
  //       name: editorType,
  //     });

  //     initWithModel.onDidChangeContent(() => {
  //       valueSetter({ value: model.getValue() });
  //     });

  //     // if (action) {
  //     //   newEditor?.addAction(action);
  //     // }

  //     monacoEditor.defineTheme('myTheme', editorTheme);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <EditorStyled>
      <MonacoWrap ref={editorRef} />
    </EditorStyled>
  );
};
