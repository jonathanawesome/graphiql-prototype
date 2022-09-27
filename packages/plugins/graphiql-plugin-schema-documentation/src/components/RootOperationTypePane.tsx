import { GraphQLObjectType } from 'graphql';

// components
import { DescriptionPaneSection } from './PaneSection/DescriptionPaneSection';
import { FieldsPaneSection } from './PaneSection/FieldsPaneSection';
import { PaneSection } from './PaneSection/PaneSection';

export const RootOperationTypePane = ({
  rootOperationType,
}: {
  rootOperationType: GraphQLObjectType;
}) => {
  // console.log('RootOperationTypePane', {});

  const fields = rootOperationType.getFields();

  return (
    <>
      <PaneSection lead="Query Root Type Name">{rootOperationType.name}</PaneSection>
      <DescriptionPaneSection description={rootOperationType.description} />
      <FieldsPaneSection fields={fields} resetTertiaryPaneOnClick={true} />
    </>
  );
};
