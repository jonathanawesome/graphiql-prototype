import { describe, expect, it } from 'vitest';
import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// components
import { Pathfinder } from '../../../components';

// hooks
import { defaultOperation, useEditor, useSchema } from '@graphiql-prototype/store';

beforeEach(() => {
  // the current state of editor hook
  const { result: editorHookResult } = renderHook(() => useEditor());

  // reset the activeDefinition
  act(() => {
    editorHookResult.current.setActiveExecutableDefinition({ definitionNode: null });
  });

  // the current state of schema hook
  const { result: schemaHookResult } = renderHook(() => useSchema());

  // initialize default schema (testSchema)
  act(() => {
    schemaHookResult.current.loadSchema({ init: true, url: 'GraphiQL Test Schema' });
  });
});

describe('Pathfinder | Toggler - Field', () => {
  // no active operation definition
  // it('add top level field when there isn't an active operation definition', async () => {});
  // it('add nested field, of any depth, when there isn't an active operation definition', async () => {});

  // with active operation definition
  // it('add top level field when there is an active operation definition', async () => {});
  // it('add nested field, of any depth, when there is an active operation definition', async () => {});
  describe('handleAddField', () => {
    it('isRootField && !hasSiblingSelections', async () => {
      // render Pathfinder UI
      render(<Pathfinder />);

      // the current state of editor hook
      const { result: editorHookResult } = renderHook(() => useEditor());

      // Toggler element for deferrable field
      const deferrableButton = screen.getByRole('button', {
        name: 'Add deferrable FIELD to operation',
      });

      // collapser element for deferrable field
      const deferrableCollapseTriggerButton = screen.getByRole('button', {
        name: 'Expand nested content of deferrable FIELD',
      });

      // fields should not be selected
      expect(deferrableButton).toHaveAttribute('aria-pressed', 'false');

      // operations model value should be default
      expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toBe(
        defaultOperation
      );

      // click the deferrable field Toggler
      await userEvent.click(deferrableButton);

      // deferrable should be pressed and expanded
      expect(deferrableButton).toHaveAttribute('aria-pressed', 'true');
      expect(deferrableCollapseTriggerButton).toHaveAttribute('aria-expanded', 'true');

      // operations model value should be
      expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
        `query newDeferrableQuery {\r\n  deferrable\r\n}`
      );
    });

    it('isRootField && hasSiblingSelections', async () => {
      // render Pathfinder UI
      render(<Pathfinder />);

      // the current state of editor hook
      const { result: editorHookResult } = renderHook(() => useEditor());

      // this does _not_ update the model/editor values, only the operationDefinition
      act(() => {
        editorHookResult.current.updateActiveDefinitionFromModelValue({
          value: `query newDeferrableQuery {\r\n  deferrable\r\n}`,
        });
      });

      console.log('values', {
        model: editorHookResult.current.getActiveTab().operationsModel.getValue(),
        activeDefinition: editorHookResult.current.activeDefinition,
      });

      // operations model value should be
      expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
        `query newDeferrableQuery {\r\n  deferrable\r\n}`
      );

      // // Toggler element for deferrable field
      // const deferrableButton = screen.getByRole('button', {
      //   name: 'Add deferrable FIELD to operation',
      // });

      // // click the deferrable field Toggler
      // await userEvent.click(deferrableButton);

      // // Toggler element for isTest field
      // const isTestButton = screen.getByRole('button', {
      //   name: 'Add isTest FIELD to operation',
      // });

      // // click the isTest field Toggler
      // await userEvent.click(isTestButton);
    });
  });
  // it('Field toggle buttons should respond correctly when clicked', async () => {
  //   // render Pathfinder UI
  //   render(<Pathfinder />);

  //   // the current state of editor hook
  //   const { result: editorHookResult } = renderHook(() => useEditor());

  //   // Toggler element for deferrable field
  //   const deferrableButton = screen.getByRole('button', {
  //     name: 'Add deferrable FIELD to operation',
  //   });

  //   // collapser element for deferrable field
  //   const deferrableCollapseTriggerButton = screen.getByRole('button', {
  //     name: 'Expand nested content of deferrable FIELD',
  //   });

  //   // Toggler element for hasArgs field
  //   const hasArgsToggleButton = screen.getByRole('button', {
  //     name: 'Add hasArgs FIELD to operation',
  //   });

  //   // fields should not be selected
  //   expect(deferrableButton).toHaveAttribute('aria-pressed', 'false');
  //   expect(deferrableCollapseTriggerButton).toHaveAttribute('aria-expanded', 'false');
  //   expect(hasArgsToggleButton).toHaveAttribute('aria-pressed', 'false');

  //   // operations model value should be default
  //   expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
  //     defaultOperation
  //   );

  //   // click the deferrable field Toggler
  //   await userEvent.click(deferrableButton);

  //   // deferrable should be pressed and expanded
  //   expect(deferrableButton).toHaveAttribute('aria-pressed', 'true');
  //   expect(deferrableCollapseTriggerButton).toHaveAttribute('aria-expanded', 'true');

  //   // no changes to hasArgs field
  //   expect(hasArgsToggleButton).toHaveAttribute('aria-pressed', 'false');

  //   // operations model value should equal
  //   expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
  //     `query Tab1 {\n  deferrable\n}`
  //   );

  //   // click the deferrable field Toggler again
  //   await userEvent.click(deferrableButton);

  //   // deferrable should not be pressed or expanded
  //   expect(deferrableButton).toHaveAttribute('aria-pressed', 'false');
  //   expect(deferrableCollapseTriggerButton).toHaveAttribute('aria-expanded', 'false');

  //   // no changes to hasArgs field
  //   expect(hasArgsToggleButton).toHaveAttribute('aria-pressed', 'false');

  //   // operations model value should have reverted to default
  //   expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
  //     defaultOperation
  //   );
  // });

  // it('toggle buttons should respond correctly to changes via monaco editor', async () => {
  //   // render Pathfinder UI
  //   render(<Pathfinder />);

  //   // the current state of editor hook
  //   const { result: editorHookResult } = renderHook(() => useEditor());

  //   // Toggler element for deferrable field
  //   const deferrableButton = screen.getByRole('button', {
  //     name: 'Add deferrable FIELD to operation',
  //   });

  //   // collapser element for deferrable field
  //   const deferrableCollapseTriggerButton = screen.getByRole('button', {
  //     name: 'Expand nested content of deferrable FIELD',
  //   });

  //   // this does _not_ update the model/editor values, only the operationDefinition
  //   act(() => {
  //     editorHookResult.current.updateActiveDefinitionFromModelValue({
  //       value: `query { deferrable }`,
  //     });
  //   });

  //   // field should respond to editor updates and be pressed here
  //   expect(deferrableButton).toHaveAttribute('aria-pressed', 'true');

  //   // adding a field in the editor automatically expands the ui...collapse trigger should be expanded
  //   expect(deferrableCollapseTriggerButton).toHaveAttribute('aria-expanded', 'true');

  //   // remove the last character
  //   act(() => {
  //     editorHookResult.current.updateActiveDefinitionFromModelValue({
  //       value: `query { deferrabl }`,
  //     });
  //   });

  //   expect(deferrableButton).toHaveAttribute('aria-pressed', 'false');
  // });
});
