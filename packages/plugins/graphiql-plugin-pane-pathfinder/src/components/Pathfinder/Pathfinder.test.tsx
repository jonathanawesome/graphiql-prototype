import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// components
import { Pathfinder } from './Pathfinder';

// hooks
import { defaultOperation, useEditor } from '@graphiql-prototype/use-editor';
import { useSchema } from '@graphiql-prototype/use-schema';

beforeEach(async () => {
  // the current state of schema hook
  const { result: schemaHookResult } = renderHook(() => useSchema());

  // initialize default schema (testSchema)
  act(() => {
    schemaHookResult.current.loadSchema({ init: true, url: 'GraphiQL Test Schema' });
  });
});

describe('Pathfinder | Toggler - Field', () => {
  it('ui should respond correctly when clicked', async () => {
    // render Pathfinder UI
    render(<Pathfinder />);

    // the current state of editor hook
    const { result: editorHookResult } = renderHook(() => useEditor());

    // Toggler element for deferrable field
    const deferrable = screen.getByRole('button', {
      name: 'Add deferrable FIELD to operation',
    });

    // collapser element for deferrable field
    const deferrableCollapseTrigger = screen.getByRole('button', {
      name: 'Expand nested content of deferrable FIELD',
    });

    // Toggler element for hasArgs field
    const hasArgs = screen.getByRole('button', {
      name: 'Add hasArgs FIELD to operation',
    });

    // fields should not be selected
    expect(deferrable).toHaveAttribute('aria-pressed', 'false');
    expect(deferrableCollapseTrigger).toHaveAttribute('aria-expanded', 'false');
    expect(hasArgs).toHaveAttribute('aria-pressed', 'false');

    // operations model value should be default
    expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
      defaultOperation
    );

    // click the deferrable field Toggler
    await userEvent.click(deferrable);

    // deferrable should be pressed and expanded
    expect(deferrable).toHaveAttribute('aria-pressed', 'true');
    expect(deferrableCollapseTrigger).toHaveAttribute('aria-expanded', 'true');

    // no changes to hasArgs field
    expect(hasArgs).toHaveAttribute('aria-pressed', 'false');

    // operations model value should equal
    expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
      `query Tab1 {\n  deferrable\n}`
    );

    // click the deferrable field Toggler again
    await userEvent.click(deferrable);

    // deferrable should not be pressed or expanded
    expect(deferrable).toHaveAttribute('aria-pressed', 'false');
    expect(deferrableCollapseTrigger).toHaveAttribute('aria-expanded', 'false');

    // no changes to hasArgs field
    expect(hasArgs).toHaveAttribute('aria-pressed', 'false');

    // operations model value should have reverted to default
    expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
      defaultOperation
    );
  });

  it('ui should respond correctly to changes via monaco editor', async () => {
    // render Pathfinder UI
    render(<Pathfinder />);

    // the current state of editor hook
    const { result: editorHookResult } = renderHook(() => useEditor());

    // Toggler element for deferrable field
    const deferrable = screen.getByRole('button', {
      name: 'Add deferrable FIELD to operation',
    });

    // collapser element for deferrable field
    const deferrableCollapseTrigger = screen.getByRole('button', {
      name: 'Expand nested content of deferrable FIELD',
    });

    // this does _not_ update the model/editor values, only the operationDefinition
    act(() => {
      editorHookResult.current.updateOperationDefinitionFromModelValue({
        value: `query { deferrable }`,
      });
    });

    // field should respond to editor updates and be pressed here
    expect(deferrable).toHaveAttribute('aria-pressed', 'true');
    // adding a field in the editor automatically expands the ui...collapse trigger should be expanded
    expect(deferrableCollapseTrigger).toHaveAttribute('aria-expanded', 'true');

    // remove the last character
    act(() => {
      editorHookResult.current.updateOperationDefinitionFromModelValue({
        value: `query { deferrabl }`,
      });
    });

    expect(deferrable).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('Pathfinder | Toggler - Argument', () => {
  describe('scalar argument', () => {
    it('ui should respond when a scalar string is entered', async () => {
      // render Pathfinder UI
      render(<Pathfinder />);

      // the current state of editor hook
      const { result: editorHookResult } = renderHook(() => useEditor());

      const hasArgsExpandButton = screen.getByRole('button', {
        name: 'Expand nested content of hasArgs FIELD',
      });

      // click the hasArgsExpandButton
      await userEvent.click(hasArgsExpandButton);

      const hasArgsArgumentsExpandButton = screen.getByRole('button', {
        name: 'Expand nested content of hasArgs arguments',
      });

      // click the hasArgsArgumentsExpandButton
      await userEvent.click(hasArgsArgumentsExpandButton);

      // input for hasArgsString
      const hasArgsString = screen.getByTestId('input-hasArgsString');

      await userEvent.type(hasArgsString, 'x');

      // operations editor should be:
      expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
        `query Tab1($hasArgsString: String) {\n  hasArgs(string: $hasArgsString)\n}`
      );

      // variables editor should be:
      expect(editorHookResult.current.getActiveTab().variablesModel.getValue()).toEqual(
        `{\n "hasArgsString": "x"\n}`
      );

      // input for hasArgsInt
      const hasArgsInt = screen.getByTestId('input-hasArgsInt');

      await userEvent.type(hasArgsInt, '12');

      // operations editor should be:
      expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
        `query Tab1($hasArgsString: String, $hasArgsInt: Int) {\n  hasArgs(string: $hasArgsString, int: $hasArgsInt)\n}`
      );

      // variables editor should be:
      expect(editorHookResult.current.getActiveTab().variablesModel.getValue()).toEqual(
        `{\n "hasArgsString": "x",\n "hasArgsInt": 12\n}`
      );

      // await userEvent.type(hasArgsString, 'jon');
      await userEvent.type(hasArgsString, '[Backspace]', { initialSelectionStart: 1 });

      // await userEvent.clear(hasArgsString);

      expect(hasArgsString).toHaveValue('');
      // console.log('hasArgsString', hasArgsString);
      // const newVal = editorHookResult.current.getActiveTab().variablesModel.getValue();

      // // variables editor should be:
      // expect(newVal).toEqual(`{\n "hasArgsInt": 12\n}`);

      // // operations editor should be:
      // expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
      //   `query Tab1($hasArgsInt: Int) {\n  hasArgs(int: $hasArgsInt)\n}`
      // );

      // input for hasArgsInt
      const hasArgsFloat = screen.getByTestId('input-hasArgsFloat');

      await userEvent.type(hasArgsFloat, '12.34');

      // operations editor should be:
      expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
        `query Tab1($hasArgsInt: Int, $hasArgsFloat: Float) {\n  hasArgs(int: $hasArgsInt, float: $hasArgsFloat)\n}`
      );

      // variables editor should be:
      expect(editorHookResult.current.getActiveTab().variablesModel.getValue()).toEqual(
        `{\n "hasArgsInt": 12,\n "hasArgsFloat": 12.34\n}`
      );
    });
  });
  // describe('input object field', () => {
  //   it('ui should respond correctly when clicked', async () => {});
  // });
});
