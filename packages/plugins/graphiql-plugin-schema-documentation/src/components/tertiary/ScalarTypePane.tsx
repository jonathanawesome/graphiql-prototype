import { Message } from '@graphiql-prototype/ui-library';
import { GraphQLScalarType } from 'graphql';

// components
import { DescriptionPaneSection } from '../PaneSection/DescriptionPaneSection';
import { PaneSection } from '../PaneSection/PaneSection';

export const ScalarTypePane = ({ type }: { type: GraphQLScalarType }) => {
  // console.log('ScalarTypePane', {
  //   type,
  // });

  return (
    <>
      {['String', 'ID', 'Int', 'Float', 'Boolean'].includes(type.name) && (
        <PaneSection>
          <Message message={<>This is a built-in scalar type</>} variant="INFO" />
        </PaneSection>
      )}
      <DescriptionPaneSection description={type.description} />
    </>
  );
};
