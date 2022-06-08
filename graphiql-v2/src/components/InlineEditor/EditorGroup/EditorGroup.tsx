/** components */
import { Editor } from '../Editor';
import { EditorStack } from '../EditorStack';

/** hooks */
import { useGraphiQL } from '../../../hooks';

/** layouts */
import { HorizontallyResizableContainer } from '../../../layouts';

/** styles */
import { EditorGroupInner, EditorGroupWrap, ResultsViewer } from './styles';
import { editor } from 'monaco-editor';
import { ResultsEditor } from '../editors/ResultsEditor';

export const EditorGroup = ({
  operationsModel,
  variablesModel,
  resultsModel,
}: {
  operationsModel: editor.ITextModel;
  variablesModel: editor.ITextModel;
  resultsModel: editor.ITextModel;
}) => {
  // const { activeTab } = useGraphiQL();
  // const result
  console.log('rendering EditorGroup', {});

  return (
    <EditorGroupWrap>
      <EditorGroupInner>
        <HorizontallyResizableContainer
          leftPane={{
            component: (
              <EditorStack
                operationsModel={operationsModel}
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
      </EditorGroupInner>
    </EditorGroupWrap>
  );
};
