import { useEffect } from 'react';
import cuid from 'cuid';
import { defaultOperation, defaultResults, defaultVariables } from '../../constants';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';

/** components */
import { HorizontallyResizableContainer } from '@graphiql-v2-prototype/graphiql-ui-library';

/** hooks */
import { useGraphiQLScout } from '../../hooks';

/** utils */
import { getOrCreateModel } from '../../utils';

/** styles */
import { ScoutWrap, ScoutInner, TabButton, TabButtonRow } from './styles';
import { Collect } from '../Collect';
import { Analyze } from '../Analyze/Analyze';

const defaultTabName = 'DEFAULT_TAB';
const defaultTabId = cuid.slug();

export const Scout = () => {
  const { activeScoutId, setActiveScoutId, editors, scouts, addScout, swapScout } =
    useGraphiQLScout();

  const operationModel = getOrCreateModel({
    uri: `${defaultTabId}-operations.graphql`,
    value: defaultOperation,
  });
  const variablesModel = getOrCreateModel({
    uri: `${defaultTabId}-variables.json`,
    value: defaultVariables,
  });
  const resultsModel = getOrCreateModel({
    uri: `${defaultTabId}-results.json`,
    value: defaultResults,
  });

  console.log('rendering Scout', {
    editors: editors.map((e) => e.editor.getModel()?.getValue()),
    scouts,
    activeScoutId,
    // operationsModel: { operationsModel, value: operationsModel.getValue() },
    // resultsModel: { resultsModel, value: resultsModel.getValue() },
  });

  useEffect(() => {
    // if (tabs.length === 0) {
    addScout({
      scout: {
        scoutId: defaultTabId,
        scoutName: defaultTabName,
        operationModel,
        variablesModel,
        resultsModel,
        operation: defaultOperation,
        variables: defaultVariables,
        results: defaultResults,
        operationDefinition: null,
      },
    });
    setActiveScoutId({ scoutId: defaultTabId });

    // initializeMode({
    //   schemas: [
    //     {
    //       schema,
    //       uri: `${cuid.slug()}-schema.graphql`,
    //     },
    //   ],
    // });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doAddTab = () => {
    const scoutId = cuid.slug();
    addScout({
      scout: {
        scoutId,
        scoutName: scoutId,
        operationModel: getOrCreateModel({
          uri: `${scoutId}-operations.graphql`,
          value: defaultOperation,
        }),
        variablesModel: getOrCreateModel({
          uri: `${scoutId}-variables.json`,
          value: defaultVariables,
        }),
        resultsModel: getOrCreateModel({
          uri: `${scoutId}-results.json`,
          value: defaultResults,
        }),
        operation: defaultOperation,
        variables: defaultVariables,
        results: defaultResults,
        operationDefinition: null,
      },
    });
  };

  const handleTabChange = ({ scoutId }: { scoutId: string }) => {
    setActiveScoutId({ scoutId });
    swapScout({ scoutId });
  };

  if (scouts.length === 0) {
    return <p>loading...</p>;
  }

  return (
    <ScoutWrap>
      <ScoutInner>
        <TabButtonRow>
          {scouts.map((t) => (
            <TabButton
              key={t.scoutId}
              disabled={t.scoutId === activeScoutId}
              onClick={() => handleTabChange({ scoutId: t.scoutId })}
              isActive={t.scoutId === activeScoutId}
            >
              {t.scoutName}
            </TabButton>
          ))}
          <button onClick={() => doAddTab()}>Add Tab</button>
        </TabButtonRow>
        <HorizontallyResizableContainer
          leftPane={{
            component: (
              <Collect operationModel={operationModel} variablesModel={variablesModel} />
            ),
            initialWidthPercent: 50,
          }}
          rightPane={{
            component: <Analyze resultsModel={resultsModel} />,
            initialWidthPercent: 50,
          }}
        />
      </ScoutInner>
    </ScoutWrap>
  );
};
