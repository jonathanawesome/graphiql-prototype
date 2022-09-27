import { GraphQLObjectType } from 'graphql';

// components
import { InterfacePaneSection } from '../PaneSection/InterfacePaneSection';
import { FieldsPaneSection } from '../PaneSection/FieldsPaneSection';
import { DescriptionPaneSection } from '../PaneSection/DescriptionPaneSection';

export const ObjectTypePane = ({ type }: { type: GraphQLObjectType }) => {
  // console.log('ObjectTypePane', {
  //   type,
  //   fields: type.getFields(),
  //   interfaces: type.getInterfaces(),
  // });

  const fields = type.getFields();
  const interfaces = type.getInterfaces();

  return (
    <>
      <DescriptionPaneSection description={type.description} />
      <FieldsPaneSection fields={fields} resetTertiaryPaneOnClick={false} />
      <InterfacePaneSection interfaces={interfaces} />
    </>
  );
};
