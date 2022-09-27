import { GraphQLInterfaceType } from 'graphql';

// components
import { DescriptionPaneSection } from '../PaneSection/DescriptionPaneSection';
import { FieldsPaneSection } from '../PaneSection/FieldsPaneSection';
import { InterfacePaneSection } from '../PaneSection/InterfacePaneSection';

export const InterfacePane = ({ int }: { int: GraphQLInterfaceType }) => {
  // console.log('InterfacePane', {
  //   int,
  //   fields: int.getFields(),
  // });

  const fields = int.getFields();
  const interfaces = int.getInterfaces();

  return (
    <>
      <DescriptionPaneSection description={int.description} />
      <FieldsPaneSection fields={fields} resetTertiaryPaneOnClick={false} />
      <InterfacePaneSection interfaces={interfaces} />
    </>
  );
};
