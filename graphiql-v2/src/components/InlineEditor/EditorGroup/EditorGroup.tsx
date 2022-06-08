import { HorizontallyResizableContainer } from '@graphiql-v2-prototype/graphiql-ui-library';

/** components */
import { Editor } from '../Editor';
import { EditorStack } from '../EditorStack';

/** styles */
import { EditorGroupInner, EditorGroupWrap, ResultsViewer } from './styles';
import { editor as MONACO_EDITOR } from 'monaco-editor';
import { ResultsEditor } from '../editors/ResultsEditor';

export const EditorGroup = ({
  operationModel,
  variablesModel,
  resultsModel,
}: {
  operationModel: MONACO_EDITOR.ITextModel;
  variablesModel: MONACO_EDITOR.ITextModel;
  resultsModel: MONACO_EDITOR.ITextModel;
}) => {
  console.log('rendering EditorGroup', {});

  return (
    <EditorGroupWrap>
      {/* <EditorGroupInner>
        <HorizontallyResizableContainer
          leftPane={{
            component: (
              <EditorStack
                operationModel={operationModel}
                variablesModel={variablesModel}
              />
            ),
            initialWidthPercent: 50,
          }}
          rightPane={{
            component: (
              <ResultsViewer>
                <ResultsEditor initWithModel={resultsModel} />
              </ResultsViewer>
            ),
            initialWidthPercent: 50,
          }}
        />
      </EditorGroupInner> */}
    </EditorGroupWrap>
  );
};
