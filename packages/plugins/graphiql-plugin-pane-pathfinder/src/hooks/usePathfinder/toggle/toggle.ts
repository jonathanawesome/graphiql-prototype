import { StoreApi } from 'zustand';
import {
  ASTNode,
  FieldNode,
  Kind,
  OperationDefinitionNode,
  OperationTypeNode,
  parse,
  // DefinitionNode,
  // Kind,
  // NameNode,
  // OperationDefinitionNode,
  // OperationTypeNode,
  print,
  SelectionNode,
  SelectionSetNode,
} from 'graphql';

// handlers
// import {
//   handleAddField,
//   handleAddArgument,
//   handleAddParentField,
//   handleAddParentInlineFragment,
//   handleRemoveField,
//   handleRemoveArgument,
//   handleUpdateParentField,
//   handleUpdateParentInlineFragment,
// } from './handlers';

// hooks
import {
  // defaultOperation,
  useEditor,
} from '@graphiql-prototype/store';

// types
import {
  AncestorField,
  // AncestorField,
  // AncestorMap,
  AncestorsArray,
  PathfinderStore,
} from '../types';
import { parseQuery } from '@graphiql-prototype/utils';

// utils
// import { parseQuery } from '@graphiql-prototype/utils';

// const initEditorTab = useEditor.getState().initEditorTab;
// const updateModel = useEditor.getState().updateModel;
// const updateOperationDefinition = useEditor.getState().updateOperationDefinition;

export const toggle = ({
  // operationType,
  get,
  ancestors,
}: {
  // ancestors: AncestorMap;
  ancestors: AncestorsArray;
  get: StoreApi<PathfinderStore>['getState'];
  // operationType: OperationTypeNode;
}) => {
  const activeEditorTab = useEditor.getState().getActiveTab();
  // const activeOperationDefinition = activeEditorTab?.operationDefinition;
  // const currentOperationType = activeEditorTab?.operationDefinition?.operation;

  // const target = ancestors.values().next().value;
  // const setNextOperationType = get().setNextOperationType;
  // const setNextSelectionSet = get().setNextSelectionSet;
  // const setNextVariableDefinitions = get().setNextVariableDefinitions;
  // const setNextAction = get().setNextAction;
  const setNewContainer = get().setNewContainer;
  const newContainer = get().newContainer;

  // let incomingOperationType: OperationTypeNode;

  // if (operationType === 'mutation') {
  //   incomingOperationType = OperationTypeNode.MUTATION;
  // } else if (operationType === 'subscription') {
  //   incomingOperationType = OperationTypeNode.SUBSCRIPTION;
  // } else {
  //   incomingOperationType = OperationTypeNode.QUERY;
  // }
  // console.log('toggle', { incomingOperationType });

  // setNextOperationType({ nextOperationType: incomingOperationType });

  // on each call to toggle, we run this function for each ancestor
  // the setNext*** functions (👆) allow us to pass data from one ancestor to the previous
  ancestors.forEach((ancestor, index) => {
    const isField = 'field' in ancestor;
    // const isInlineFragment = 'onType' in ancestor;
    // const isArgument = 'argument' in ancestor;
    const isRootOperation = 'operationDefinition' in ancestor;

    if (isRootOperation) {
      // const printedOperationDefinition =
      //   'operationDefinition' in ancestor &&
      //   ancestor.operationDefinition &&
      //   print(ancestor.operationDefinition);

      const opDef: OperationDefinitionNode = {
        kind: Kind.OPERATION_DEFINITION,
        operation: ancestor.rootTypeName,
        name: {
          kind: Kind.NAME,
          value: 'someNewQuery',
        },
        selectionSet: {
          kind: Kind.SELECTION_SET,
          selections: [],
        },
        variableDefinitions: [],
      };
      console.log('toggle forEach on rootOperation', {
        arrayPosition: index,
        opDef,
        printOpDef: print(opDef),
        // ancestor,
        // ancestors,
        // printedOperationDefinition,
      });
      const ok = `query someTestQuery {\n\n}`;
      if (!ancestor.operationDefinition) {
        setNewContainer({
          // astNode: opDef,
          range: activeEditorTab.operationsModel.getFullModelRange(),
          text: ok,
        });
        // console.log('printed OpDef', print(opDef));
      } else {
        const parsedQuery = parseQuery(activeEditorTab.operationsModel.getValue());
        if (parsedQuery && !(parsedQuery instanceof Error)) {
          setNewContainer({
            // astNode: [...parsedQuery.definitions][0],
            range: activeEditorTab.operationsModel.getFullModelRange(),
            text: ok,
          });
        }
      }
    }

    if (isField) {
      const selSet: SelectionSetNode = {
        kind: Kind.SELECTION_SET,
        selections: [
          {
            kind: Kind.FIELD,
            name: {
              kind: Kind.NAME,
              value: ancestor.field.name,
            },
          },
        ],
      };
      console.log('toggle forEach on field', {
        container: get().newContainer,
        // opDef,
        // newOk,
        // matches,
        selSet,
        printSelSet: print(selSet),
        ancestor,
        ancestors,
      });
      if (ancestor.selection) {
      } else {
        const previousAncestor = ancestors[index - 1];

        // const opDef = get().newContainer?.astNode as OperationDefinitionNode;

        let newOk = ``;
        newOk = get().newContainer?.text.replace(
          '{}',
          `{\n  ${ancestor.field.name}\n}`
        ) as string;
        // if (index === 1 && !('field' in previousAncestor)) {
        // } else {
        //   newOk = get().newContainer?.text.replace(
        //     '{}',
        //     `{\n  ${previousAncestor.field.name} {\n    ${ancestor.field.name}\n  }\n}`
        //   ) as string;
        // }
        // const newOpDef: OperationDefinitionNode = {
        //   ...opDef,
        //   selectionSet:
        //     index === 1
        //       ? selSet
        //       : {
        //           ...opDef.selectionSet,
        //           selections: [...opDef.selectionSet.selections, ...selSet.selections],
        //         },
        // };

        const matches = activeEditorTab.operationsModel.findMatches(
          newOk,
          true,
          false,
          true,
          null,
          true
        );

        // const printedAncestorSelection =
        //   ancestor.selection && print(ancestor.selection as SelectionNode);
        // const printedAncestorSelectionSet =
        //   ancestor.selectionSet && print(ancestor.selectionSet as SelectionSetNode);

        // const newFieldNode: SelectionNode = {
        //   kind: Kind.FIELD,
        //   name: {
        //     kind: Kind.NAME,
        //     value: ancestor.field.name,
        //   },
        // };

        // if this field is a lead, we don't need to add the curly brackets
        const newText = `  ${ancestor.field.name} {\n\n  }\n`;
        console.warn({ matches, newText, newOk });
        setNewContainer({
          // astNode: newOpDef,
          range:
            (matches.length > 0 && {
              ...matches[0].range,
              startColumn: 1,
              endColumn: 1,
              startLineNumber: matches[0].range.endLineNumber,
              endLineNumber: matches[0].range.endLineNumber,
            }) ||
            activeEditorTab.operationsModel.getFullModelRange(),
          text: (matches.length > 0 && newText) || newOk,
          // text: newText,
        });
      }
    }
    //   [
    //     {
    //         "range": {
    //             "startLineNumber": 1,
    //             "startColumn": 1,
    //             "startColumn": endLineNumber,
    //             "endLineNumber": 3,
    //             "endColumn": 2
    //         },
    //         "matches": [
    //             "query someNewQuery {\n  deferrable\n}"
    //         ]
    //     }
    // ]
    // /** begin handle TARGET */
    // if (ancestor === target) {
    //   // console.log('on TARGET', {
    //   //   ancestor,
    //   //   target,
    //   //   isArgument,
    //   //   isField,
    //   //   isInlineFragment,
    //   // });

    //   /** begin handle ARGUMENT */
    //   if (isArgument) {
    //     // console.log('isArgument');
    //     if (!ancestor.selection) {
    //       handleAddArgument({
    //         ancestor,
    //         setNextAction,
    //       });
    //     } else {
    //       handleRemoveArgument({
    //         ancestor,
    //         setNextAction,
    //         setNextVariableDefinitions,
    //       });
    //     }
    //   } /** end handle ARGUMENT */

    //   /** begin handle FIELD */
    //   if (isField) {
    //     // console.log('isField');
    //     if (!ancestor.selection) {
    //       handleAddField({
    //         ancestor,
    //         nextOperationType: get().nextOperationType,
    //         setNextSelectionSet,
    //         setNextVariableDefinitions,
    //       });
    //     } else {
    //       handleRemoveField({
    //         ancestor,
    //         setNextSelectionSet,
    //         setNextVariableDefinitions,
    //         target,
    //       });
    //     }
    //   } /** end handle FIELD */

    //   /** end handle TARGET */
    // } else {
    //   /** begin handle PARENT */

    //   /** begin handle parent FIELD */
    //   if (isField) {
    //     // console.log('isField(parent)');
    //     if (!ancestor.selection) {
    //       handleAddParentField({
    //         ancestor,
    //         nextAction: get().nextAction,
    //         nextSelectionSet: get().nextSelectionSet,
    //         setNextAction,
    //         setNextSelectionSet,
    //       });
    //     } else {
    //       handleUpdateParentField({
    //         ancestor,
    //         nextAction: get().nextAction,
    //         nextSelectionSet: get().nextSelectionSet,
    //         setNextAction,
    //         setNextSelectionSet,
    //       });
    //     }
    //   } /** end handle parent FIELD */

    //   /** begin handle parent INLINE_FRAGMENT */
    //   if (isInlineFragment) {
    //     // console.log('isInlineFragment)');
    //     if (!ancestor.selection) {
    //       handleAddParentInlineFragment({
    //         ancestor,
    //         nextSelectionSet: get().nextSelectionSet,
    //         setNextSelectionSet,
    //       });
    //     } else {
    //       handleUpdateParentInlineFragment({
    //         ancestor,
    //         nextSelectionSet: get().nextSelectionSet,
    //         setNextSelectionSet,
    //       });
    //     }
    //   } /** end handle parent INLINE_FRAGMENT */
    // } /** end handle PARENT */
  });

  console.log('shit', {
    range: get().newContainer?.range,
    text: get().newContainer?.text,
  });

  activeEditorTab.operationsModel.pushEditOperations(
    [],
    [
      {
        forceMoveMarkers: true,
        range:
          get().newContainer?.range ||
          activeEditorTab.operationsModel.getFullModelRange(),
        text: get().newContainer?.text || 'no new text to insert',
      },
    ],
    () => null
  );

  // console.log('setting nextDefinition', {
  //   nextSelectionSet: get().nextSelectionSet,
  //   nextVariableDefinitions: get().nextVariableDefinitions,
  // });

  // const nextSelectionSet = get().nextSelectionSet;
  // const nextOperationType = get().nextOperationType;

  // console.log('nextOperationType', {
  //   nextOperationType,
  //   currentOperationType,
  //   activeOperationDefinition,
  // });

  // let nextDefinition: OperationDefinitionNode;

  // const kind = Kind.OPERATION_DEFINITION;

  // const operation = () => {
  //   if (nextOperationType === 'mutation') {
  //     return OperationTypeNode.MUTATION;
  //   }
  //   if (nextOperationType === 'subscription') {
  //     return OperationTypeNode.SUBSCRIPTION;
  //   }
  //   return OperationTypeNode.QUERY;
  // };

  // const name = (count: number): NameNode => ({
  //   kind: Kind.NAME,
  //   value: `Tab${count}`,
  // });

  // const variableDefinitions = get().nextVariableDefinitions;

  // console.log('variableDefinitions', {
  //   variableDefinitions,
  // });

  // const selectionSet = nextSelectionSet ?? {
  //   kind: Kind.SELECTION_SET,
  //   selections: [],
  // };

  // if the rootType is different than currentOperationType,
  // spin up a new tab and do work there
  // if (currentOperationType && nextOperationType !== currentOperationType) {
  //   initEditorTab({});

  //   nextDefinition = {
  //     kind,
  //     operation: operation(),
  //     name: name(useEditor.getState().editorTabs.length),
  //     variableDefinitions,
  //     selectionSet,
  //   };
  // } else {
  //   nextDefinition = {
  //     ...(activeOperationDefinition
  //       ? activeOperationDefinition
  //       : // 👇 we don't have an active operation definition, so this is the initial tab
  //         {
  //           kind,
  //           operation: operation(),
  //           name: name(useEditor.getState().editorTabs.length),
  //         }),
  //     variableDefinitions,
  //     selectionSet,
  //   };
  // }

  // TODO: 👇 all these bits are well-commented but super messy

  // We should ensure we're respecting the authoring of multiple operations in a single operations editor.
  // In GraphiQL and Playground, this is handled by a conditional menu that pops up when you pressed the play/execute button.
  // e can't do that here because Pathfinder can _only_ listen to the first operation.

  // Let's get the active tab's operation model value
  // const activeOperationsModel = activeEditorTab.operationsModel.getValue();

  // We parse the active operations model so we can get the definitions
  // const parsedActiveOperationsModelValue = parseQuery(activeOperationsModel);

  // let additionalDefinitions: DefinitionNode[] = [];

  // If, on parse, we don't have an error _and_ we have definitions _and_ there's more than one definition
  // if (
  //   !(parsedActiveOperationsModelValue instanceof Error) &&
  //   parsedActiveOperationsModelValue?.definitions &&
  //   parsedActiveOperationsModelValue.definitions.length > 1
  // ) {
  //   // We copy the array here to get around the readonly DefinitionNode[] and also splice the first operation off the array
  //   additionalDefinitions = [...parsedActiveOperationsModelValue.definitions].splice(1);
  // }

  // We have selections, let's update our operation definition and model
  // if (nextSelectionSet && nextSelectionSet.selections.length > 0) {
  //   // We always update our operation definition because this is the bit that pathfinder is listening to
  //   updateOperationDefinition({ newDefinition: nextDefinition });

  //   // If we have additional operations in the editor, we need to spread them in
  //   if (additionalDefinitions.length > 0) {
  //     updateModel({
  //       modelType: 'operationsModel',
  //       newValue: print({
  //         kind: Kind.DOCUMENT,
  //         definitions: [nextDefinition, ...additionalDefinitions],
  //       }),
  //     });
  //   } else {
  //     // We only have a single operation in the editor
  //     updateModel({
  //       modelType: 'operationsModel',
  //       newValue: print({
  //         kind: Kind.DOCUMENT,
  //         definitions: [nextDefinition],
  //       }),
  //     });
  //   }
  // } else if (additionalDefinitions.length > 0) {
  //   // If we're here, we don't have a new, first definition but we do have other definitions
  //   updateModel({
  //     modelType: 'operationsModel',
  //     newValue: print({
  //       kind: Kind.DOCUMENT,
  //       definitions: [...additionalDefinitions],
  //     }),
  //   });
  // } else {
  //   // If we're here, we've got no additional definitions and no new definition...so we just reset
  //   updateOperationDefinition({ newDefinition: null });
  //   updateModel({
  //     modelType: 'operationsModel',
  //     newValue: defaultOperation,
  //   });
  // }

  // clear state for next toggle
  // setNextSelectionSet({ nextSelectionSet: null });
  // setNextVariableDefinitions({ nextVariableDefinitions: [] });
};
