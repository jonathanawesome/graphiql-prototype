import { GraphQLUnionType } from 'graphql';

// components
import { DescriptionPaneSection } from '../PaneSection/DescriptionPaneSection';
import { PossibleTypesPaneSection } from '../PaneSection/PossibleTypesPaneSection';

export const UnionTypePane = ({ type }: { type: GraphQLUnionType }) => {
  // console.log('UnionTypePane', {
  //   type,
  // });

  const types = type.getTypes();

  return (
    <>
      <DescriptionPaneSection description={type.description} />
      <PossibleTypesPaneSection possibleTypes={types} />
    </>
  );
};
