import { useEffect, useRef, useState } from 'react';
import { editor as MONACO_EDITOR } from 'monaco-editor';
import { printSchema } from 'graphql';

// hooks
import { editorOptions, useSchema } from '@graphiql-prototype/store';
// import {  } from '@graphiql-prototype/store';

// styles
import { StyledSchemaDefinitionWrap, StyledSchemaDefinition } from './styles';

// utils
import { getOrCreateModel } from '@graphiql-prototype/utils';

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

  return (
    <div className={StyledSchemaDefinitionWrap()}>
      <div className={StyledSchemaDefinition()} ref={editorRef}></div>
    </div>
  );
};
