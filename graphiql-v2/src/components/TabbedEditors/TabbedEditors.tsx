/** hooks */
// import cuid from 'cuid';
// import { editor } from 'monaco-editor';
// import { useEffect, useState } from 'react';
// import { defaultOperation, defaultResults, defaultVariables } from '../../constants';
// import { useGraphiQL } from '../../hooks';
// import { getOrCreateModel } from '../../utils';
// import { InlineEditor } from '../InlineEditor';

/** styles */
import {
  // Content, Root, Trigger, TriggerList,
  Wrap,
  // TabButton,
  // TabButtonRow,
} from './styles';

// const defaultTabName = 'DEFAULT_TAB';
// const defaultTabId = cuid.slug();

export const TabbedEditors = () => {
  // const [activeTab, setActiveTab] = useState<string>(defaultTabId);
  // const {
  //   activeSurveyor,
  //   setActiveSurveyor,
  //   editors,
  //   surveyors,
  //   addSurveyor,
  //   swapSurveyor,
  // } = useGraphiQL();

  // const opsUri = `${tabName}-operations.graphql`;
  // const varsUri = `${tabName}-variables.json`;
  // const resultsUri = `${tabName}-results.json`;

  // const opsModel = getOrCreateModel({ uri: opsUri, value: defaultOperation });
  // const varsModel = getOrCreateModel({ uri: varsUri, value: defaultVariables });
  // const resultsModel = getOrCreateModel({ uri: resultsUri, value: defaultResults });
  // const operationModel = getOrCreateModel({
  //   uri: `${defaultTabId}-operations.graphql`,
  //   value: defaultOperation,
  // });
  // const variablesModel = getOrCreateModel({
  //   uri: `${defaultTabId}-variables.json`,
  //   value: defaultVariables,
  // });
  // const resultsModel = getOrCreateModel({
  //   uri: `${defaultTabId}-results.json`,
  //   value: defaultResults,
  // });

  // console.log('rendering TabbedEditors', {
  //   editors: editors.map((e) => e.editor.getModel()?.getValue()),
  //   surveyors,
  //   activeSurveyor,
  //   // operationsModel: { operationsModel, value: operationsModel.getValue() },
  //   // resultsModel: { resultsModel, value: resultsModel.getValue() },
  // });

  // useEffect(() => {
  //   // if (tabs.length === 0) {
  //   addSurveyor({
  //     surveyor: {
  //       surveyorId: defaultTabId,
  //       surveyorName: defaultTabName,
  //       operationModel,
  //       variablesModel,
  //       resultsModel,
  //       operation: defaultOperation,
  //       variables: defaultVariables,
  //       results: defaultResults,
  //       operationDefinition: null,
  //     },
  //   });
  //   setActiveSurveyor({ surveyorId: defaultTabId });

  //   // swapSurvey({ surveyorId: defaultTabId });

  //   // swapSurvey({ surveyorId: defaultTabId });
  //   // operationsEditor?.editor.setModel(operationsModel);
  //   // variablesEditor?.editor.setModel(variablesModel);
  //   // resultsEditor?.editor.setModel(resultsModel);

  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const doAddTab = () => {
  //   const surveyorId = cuid.slug();
  //   addSurveyor({
  //     surveyor: {
  //       surveyorId,
  //       surveyorName: surveyorId,
  //       operationModel: getOrCreateModel({
  //         uri: `${surveyorId}-operations.graphql`,
  //         value: defaultOperation,
  //       }),
  //       variablesModel: getOrCreateModel({
  //         uri: `${surveyorId}-variables.json`,
  //         value: defaultVariables,
  //       }),
  //       resultsModel: getOrCreateModel({
  //         uri: `${surveyorId}-results.json`,
  //         value: defaultResults,
  //       }),
  //       operation: defaultOperation,
  //       variables: defaultVariables,
  //       results: defaultResults,
  //       operationDefinition: null,
  //     },
  //   });
  // };

  // const handleTabChange = ({ surveyorId }: { surveyorId: string }) => {
  //   setActiveSurveyor({ surveyorId });
  //   swapSurveyor({ surveyorId });
  // };

  // if (surveyors.length === 0) {
  //   return <p>loading...</p>;
  // }

  return (
    <>
      <Wrap>
        {/* <TabButtonRow>
          {surveyors.map((t) => (
            <TabButton
              key={t.surveyorId}
              disabled={t.surveyorId === activeSurveyor}
              onClick={() => handleTabChange({ surveyorId: t.surveyorId })}
              isActive={t.surveyorId === activeSurveyor}
            >
              {t.surveyorName}
            </TabButton>
          ))}
          <button onClick={() => doAddTab()}>Add Tab</button>
        </TabButtonRow>
        <InlineEditor
          operationModel={operationModel}
          variablesModel={variablesModel}
          resultsModel={resultsModel}
        /> */}
      </Wrap>
    </>
  );
};
