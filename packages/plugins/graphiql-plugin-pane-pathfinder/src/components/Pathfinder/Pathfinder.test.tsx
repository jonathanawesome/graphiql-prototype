import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// components
import { Pathfinder } from './Pathfinder';

// hooks
import { defaultOperation, useEditor } from '@graphiql-prototype/use-editor';
import { useSchema } from '@graphiql-prototype/use-schema';

describe('Pathfinder | Toggler - Field', () => {
  it('ui should respond correctly when clicked', async () => {
    // render Pathfinder UI
    const { getByRole } = render(<Pathfinder />);

    // the current state of editor hook
    const { result: editorHookResult } = renderHook(() => useEditor());

    // the current state of schema hook
    const { result: schemaHookResult } = renderHook(() => useSchema());

    // initialize default schema (testSchema)
    act(() => {
      schemaHookResult.current.loadSchema({ init: true, url: 'GraphiQL Test Schema' });
    });

    // Toggler element for deferrable field
    const deferrable = getByRole('button', {
      name: 'Add deferrable FIELD to operation',
    });

    // collapser element for deferrable field
    const deferrableCollapseTrigger = getByRole('button', {
      name: 'Expand nested content of deferrable FIELD',
    });

    // Toggler element for hasArgs field
    const hasArgs = getByRole('button', { name: 'Add hasArgs FIELD to operation' });

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

    // deferrable should be pressed but NOT expanded
    expect(deferrable).toHaveAttribute('aria-pressed', 'true');
    expect(deferrableCollapseTrigger).toHaveAttribute('aria-expanded', 'false');

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
    const { getByRole } = render(<Pathfinder />);

    // the current state of editor hook
    const { result: editorHookResult } = renderHook(() => useEditor());

    // the current state of schema hook
    const { result: schemaHookResult } = renderHook(() => useSchema());

    // initialize default schema (testSchema)
    act(() => {
      schemaHookResult.current.loadSchema({ init: true, url: 'GraphiQL Test Schema' });
    });

    // Toggler element for deferrable field
    const deferrable = getByRole('button', {
      name: 'Add deferrable FIELD to operation',
    });

    // collapser element for deferrable field
    const deferrableCollapseTrigger = getByRole('button', {
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
    // adding a field in the editor does _not_ automatically expand the ui...collapse trigger should _not_ be expanded
    expect(deferrableCollapseTrigger).toHaveAttribute('aria-expanded', 'false');

    // remove the last character
    act(() => {
      editorHookResult.current.updateOperationDefinitionFromModelValue({
        value: `query { deferrabl }`,
      });
    });

    expect(deferrable).toHaveAttribute('aria-pressed', 'false');
  });
});
