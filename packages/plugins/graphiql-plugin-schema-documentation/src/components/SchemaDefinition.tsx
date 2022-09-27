import { useEffect, useRef, useState } from 'react';
import { editor as MONACO_EDITOR } from 'monaco-editor/esm/vs/editor/editor.api';
import { printSchema } from 'graphql';

// hooks
import { editorOptions } from '@graphiql-prototype/use-editor';
import { useSchema } from '@graphiql-prototype/use-schema';

// styles
import { SchemaDefinitionStyled } from './styles';

// utils
import { getOrCreateModel } from '@graphiql-prototype/use-editor/src/utils';

export const SchemaDefinition = () => {
  const { schema } = useSchema();

  const [editor, setEditor] = useState<MONACO_EDITOR.IStandaloneCodeEditor | null>(null);

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (schema && !('error' in schema) && !editor) {
      const model = getOrCreateModel({
        uri: `schema-definition.graphql`,
        value: printSchema(schema),
      });
      const newEditor = MONACO_EDITOR.create(
        editorRef.current as unknown as HTMLDivElement,
        {
          language: 'graphql',
          ...editorOptions, // spread our base options
          readOnly: true,
          scrollBeyondLastLine: true,
          scrollbar: {
            // hide the scrollbars
            horizontal: 'visible',
            vertical: 'visible',
          },
          model,
        }
      );
      setEditor(newEditor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('SchemaDefinition schmea change', {
      schema,
    });
    if (schema && !('error' in schema)) {
      editor?.setValue(printSchema(schema));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema]);

  return <SchemaDefinitionStyled ref={editorRef}></SchemaDefinitionStyled>;
};
