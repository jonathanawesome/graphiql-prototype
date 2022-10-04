import { describe, expect, it } from 'vitest';
import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// components
import { Pathfinder } from '../Pathfinder';

// hooks
import { defaultOperation, useEditor } from '@graphiql-prototype/use-editor';
import { useSchema } from '@graphiql-prototype/use-schema';

beforeEach(() => {
  // the current state of schema hook
  const { result: schemaHookResult } = renderHook(() => useSchema());

  // initialize default schema (testSchema)
  act(() => {
    schemaHookResult.current.loadSchema({ init: true, url: 'GraphiQL Test Schema' });
  });
});

describe('Pathfinder | Toggler - Field', () => {
  it('Field toggle buttons should respond correctly when clicked', async () => {
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

    // Toggler element for hasArgs field
    const hasArgsToggleButton = screen.getByRole('button', {
      name: 'Add hasArgs FIELD to operation',
    });

    // fields should not be selected
    expect(deferrableButton).toHaveAttribute('aria-pressed', 'false');
    expect(deferrableCollapseTriggerButton).toHaveAttribute('aria-expanded', 'false');
    expect(hasArgsToggleButton).toHaveAttribute('aria-pressed', 'false');

    // operations model value should be default
    expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
      defaultOperation
    );

    // click the deferrable field Toggler
    await userEvent.click(deferrableButton);

    // deferrable should be pressed and expanded
    expect(deferrableButton).toHaveAttribute('aria-pressed', 'true');
    expect(deferrableCollapseTriggerButton).toHaveAttribute('aria-expanded', 'true');

    // no changes to hasArgs field
    expect(hasArgsToggleButton).toHaveAttribute('aria-pressed', 'false');

    // operations model value should equal
    expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
      `query Tab1 {\n  deferrable\n}`
    );

    // click the deferrable field Toggler again
    await userEvent.click(deferrableButton);

    // deferrable should not be pressed or expanded
    expect(deferrableButton).toHaveAttribute('aria-pressed', 'false');
    expect(deferrableCollapseTriggerButton).toHaveAttribute('aria-expanded', 'false');

    // no changes to hasArgs field
    expect(hasArgsToggleButton).toHaveAttribute('aria-pressed', 'false');

    // operations model value should have reverted to default
    expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
      defaultOperation
    );
  });

  it('toggle buttons should respond correctly to changes via monaco editor', async () => {
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

    // this does _not_ update the model/editor values, only the operationDefinition
    act(() => {
      editorHookResult.current.updateOperationDefinitionFromModelValue({
        value: `query { deferrable }`,
      });
    });

    // field should respond to editor updates and be pressed here
    expect(deferrableButton).toHaveAttribute('aria-pressed', 'true');

    // adding a field in the editor automatically expands the ui...collapse trigger should be expanded
    expect(deferrableCollapseTriggerButton).toHaveAttribute('aria-expanded', 'true');

    // remove the last character
    act(() => {
      editorHookResult.current.updateOperationDefinitionFromModelValue({
        value: `query { deferrabl }`,
      });
    });

    expect(deferrableButton).toHaveAttribute('aria-pressed', 'false');
  });
});
