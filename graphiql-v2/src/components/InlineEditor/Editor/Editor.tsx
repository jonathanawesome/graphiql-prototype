import { useEffect, useRef, useState } from 'react';
import { editor as monacoEditor } from 'monaco-editor';

/** constants */
// import { editorOptions } from '../../../constants';

/** hooks */
import { useGraphiQL } from '../../../hooks';

/** styles */
import { EditorStyled, MonacoWrap } from './styles';

/** theme */
// import { editorTheme } from '../../../../../graphiql-ui-library/src/theme';

export const Editor = ({
  optionOverrides,
  // value,
  // valueSetter,
  editorType,
  model,
}: {
  optionOverrides?: monacoEditor.IStandaloneEditorConstructionOptions;
  // value: string;
  // valueSetter: ({ value }: { value: string }) => void;
  editorType: 'operation' | 'variables' | 'results';
  model: monacoEditor.ITextModel;
}) => {
  const editorRef = useRef(null);
  // const {
  //   // schema,
  //   activeSurveyor,
  //   surveyors,
  //   editors,
  //   addEditor,
  //   // ,
  // } = useGraphiQL();

  // const [value, setValue] = useState<string | null>(null);

  // const editor = editors.find((e) => e.name === editorType);
  // // const model = editor?.editor.getModel();

  // const surveyor = surveyors.find((surveyor) => surveyor.surveyorId === activeSurveyor);

  // // let val: string;
  // // if (surveyor) {
  // //   val = surveyor[editorType];
  // // }
  // useEffect(() => {
  //   if (surveyor) {
  //     console.log('SETTING VALUE', { 'surveyor[editorType]': surveyor[editorType] });
  //     // setValue(surveyor[editorType] as string);
  //     if (editor) {
  //       const selection = editor.editor.getSelection();
  //       const m = editor.editor.getModel();
  //       console.log('value changing in editor', { value, selection, m });
  //       if (selection && m) {
  //         editor.editor.executeEdits('update-value', [
  //           {
  //             range: m.getFullModelRange(),
  //             text: editorType === 'results' ? surveyor.results : 'puppy food',
  //             forceMoveMarkers: true,
  //           },
  //         ]);
  //         editor.editor.setSelection(selection);
  //       }
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [surveyor]);

  // console.log('rendering Editor', {
  //   // editors,
  //   value,
  //   editorType,
  //   editor,
  //   editorInfo: {
  //     // id: editor?.editor.getId(),
  //     name: editor?.name,
  //     editor: editor?.editor,
  //     editorValue: editor?.editor.getValue(),
  //     model: editor?.editor.getModel(),
  //     modelValue: editor?.editor.getModel()?.getValue(),
  //   },
  //   // model: {
  //   //   model,
  //   //   value: model?.getValue(),
  //   //   uri: model?.uri,
  //   // },
  // });

  // // useEffect(() => {
  // //   if (editor) {
  // //     editor.setModel(model);
  // //   }
  // //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // // }, [schema]);

  // // useEffect(() => {
  // //   console.log('rendering Editor, model is changing', {
  // //     // editors,
  // //     editorType,
  // //     editorInfo: {
  // //       // id: editor?.editor.getId(),
  // //       name: editor?.name,
  // //       editor: editor?.editor,
  // //       model: editor?.editor.getModel(),
  // //     },
  // //     model: {
  // //       model,
  // //       value: model?.getValue(),
  // //       uri: model?.uri,
  // //     },
  // //   });
  // //   //TODO can we set the initial model here?
  // //   // if (editor && model) {
  // //   //   editor.editor.setModel(model);
  // //   // }
  // //   // if (model) {
  // //   //   model.onDidChangeContent(() => {
  // //   //     valueSetter({ value: model.getValue() });
  // //   //   });
  // //   // }
  // //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // // }, [model]);

  // useEffect(() => {
  //   if (!editor) {
  //     // console.log('help', { model });
  //     const newEditor = monacoEditor.create(
  //       editorRef.current as unknown as HTMLDivElement,
  //       {
  //         language: editorType === 'operation' ? 'graphql' : 'json',
  //         model,
  //         // ...editorOptions, // spread our base options
  //         ...(optionOverrides && optionOverrides), // spread any option overrides that were passed in
  //       }
  //     );

  //     addEditor({
  //       editor: newEditor,
  //       name: editorType,
  //     });

  //     // if (action) {
  //     //   newEditor?.addAction(action);
  //     // }

  //     // monacoEditor.defineTheme('myTheme', editorTheme);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (editor && model) {
  //     editor.editor.setModel(model);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [model]);

  // useEffect(() => {
  //   console.log('value changing in editor', { value });

  //   if (editor) {
  //     const selection = editor.editor.getSelection();
  //     const m = editor.editor.getModel();
  //     console.log('value changing in editor', { value, selection, m });
  //     if (selection && m) {
  //       editor.editor.executeEdits('update-value', [
  //         {
  //           range: m.getFullModelRange(),
  //           text: value,
  //           forceMoveMarkers: true,
  //         },
  //       ]);
  //       editor.editor.setSelection(selection);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [value]);

  return (
    <EditorStyled>
      <MonacoWrap ref={editorRef} />
    </EditorStyled>
  );
};
