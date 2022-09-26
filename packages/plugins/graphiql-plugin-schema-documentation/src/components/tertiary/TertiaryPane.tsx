import { ReactElement } from 'react';
import {
  isDirective,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isNamedType,
  isObjectType,
  isScalarType,
  isUnionType,
} from 'graphql';

// components
import { DirectivePane } from './DirectivePane';
import { EnumTypePane } from './EnumTypePane';
import { FieldPane } from './FieldPane';
import { Icon } from '@graphiql-prototype/ui-library';
import { InputObjectTypePane } from './InputObjectTypePane';
import { InterfacePane } from './InterfacePane';
import { ObjectTypePane } from './ObjectTypePane';
import { ScalarTypePane } from './ScalarTypePane';
import { UnionTypePane } from './UnionTypePane';

// hooks
import { useSchemaReference } from '../../hooks';

// styles
import {
  StyledTertiaryPane,
  StyledTertiaryPaneContent,
  StyledTertiaryPaneLead,
  StyledTertiaryPaneLeadInfo,
  StyledTertiaryPaneNavButton,
} from '../styles';

// types
import { TertiaryPaneType } from '../../hooks/useSchemaReference/types';

export const TertiaryPane = ({ pane }: { pane: TertiaryPaneType }) => {
  const {
    activeTertiaryPane,
    clearTertiaryPaneStack,
    navigateTertiaryPaneStack,
    tertiaryPaneStack,
  } = useSchemaReference();

  if (!activeTertiaryPane) {
    return null;
  }

  // const { pane } = activeTertiaryPane;

  const indexOf = tertiaryPaneStack.indexOf(activeTertiaryPane);
  const length = tertiaryPaneStack.length;

  const canNavigateBack = length > 1 && indexOf > 0 && indexOf + 1 <= length;

  // console.log('TertiaryPane', {});

  let leadType = '';
  let toRender: ReactElement = <></>;

  if (activeTertiaryPane && isNamedType(pane)) {
    if (isScalarType(pane)) {
      leadType = 'Scalar';
      toRender = <ScalarTypePane type={pane} />;
    }
    if (isEnumType(pane)) {
      leadType = 'Enum';
      toRender = <EnumTypePane type={pane} />;
    }
    if (isInputObjectType(pane)) {
      leadType = 'Input object';
      toRender = <InputObjectTypePane type={pane} />;
    }
    if (isObjectType(pane)) {
      leadType = 'Object';
      toRender = <ObjectTypePane type={pane} />;
    }
    if (isUnionType(pane)) {
      leadType = 'Union';
      toRender = <UnionTypePane type={pane} />;
    }
  }

  if (activeTertiaryPane && isInterfaceType(pane)) {
    leadType = 'Interface';
    toRender = <InterfacePane int={pane} />;
  }

  if (activeTertiaryPane && isDirective(pane)) {
    leadType = 'Directive';
    toRender = <DirectivePane directive={pane} />;
  }

  if (activeTertiaryPane && 'args' in pane && !isDirective(pane)) {
    leadType = 'Field';
    toRender = <FieldPane field={pane} />;
  }

  return (
    <StyledTertiaryPane>
      <StyledTertiaryPaneLead>
        <StyledTertiaryPaneLeadInfo>
          <span>{leadType}</span>
          <span>{activeTertiaryPane?.pane.name}</span>
        </StyledTertiaryPaneLeadInfo>
        {canNavigateBack && (
          <StyledTertiaryPaneNavButton isActive={canNavigateBack}>
            <button
              disabled={!canNavigateBack}
              onClick={() => {
                if (canNavigateBack) {
                  return navigateTertiaryPaneStack({ destinationPaneIndex: indexOf - 1 });
                }
                return undefined;
              }}
            >
              <Icon name="ChevronLarge" />
            </button>
          </StyledTertiaryPaneNavButton>
        )}
        <StyledTertiaryPaneNavButton isActive={true}>
          <button onClick={() => clearTertiaryPaneStack()}>
            <Icon name="Close" />
          </button>
        </StyledTertiaryPaneNavButton>
      </StyledTertiaryPaneLead>
      <StyledTertiaryPaneContent>{toRender}</StyledTertiaryPaneContent>
    </StyledTertiaryPane>
  );
};
