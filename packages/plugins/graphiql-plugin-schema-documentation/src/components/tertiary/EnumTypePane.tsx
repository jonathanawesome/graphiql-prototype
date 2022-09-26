import { GraphQLEnumType } from 'graphql';

// components
import { DescriptionPaneSection } from '../PaneSection/DescriptionPaneSection';
import { EnumValuesPaneSection } from '../PaneSection/EnumValuesPaneSection';

export const EnumTypePane = ({ type }: { type: GraphQLEnumType }) => {
  // console.log('EnumTypePane', {
  //   type,
  // });

  return (
    <>
      <DescriptionPaneSection description={type.description} />
      <EnumValuesPaneSection enumValues={type.getValues()} />
    </>
  );
};
