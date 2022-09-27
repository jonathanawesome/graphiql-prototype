import { GraphQLInputObjectType } from 'graphql';

// components
import { DescriptionPaneSection } from '../PaneSection/DescriptionPaneSection';
import { InputFieldsPaneSection } from '../PaneSection/InputFieldsPaneSection';

export const InputObjectTypePane = ({ type }: { type: GraphQLInputObjectType }) => {
  // console.log('InputObjectTypePane', {
  //   type,
  //   fields: type.getFields(),
  // });

  const fields = type.getFields();

  return (
    <>
      <DescriptionPaneSection description={type.description} />
      <InputFieldsPaneSection fields={fields} />
    </>
  );
};
