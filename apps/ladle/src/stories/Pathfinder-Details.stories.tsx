// components
import { Details } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';

// hooks
import { useTestSchema } from '@graphiql-v2-prototype/graphiql-test-schema';
import { GraphQLUnionType, isInputObjectType } from 'graphql';

// export const DeferrableDetailsStory = () => {
//   const { getQueryField } = useTestSchema();
//   const field2 = getQueryField();
//   const queryType = testSchema.getQueryType();
//   const field = queryType?.getFields;
//   console.log('field', { field });
//   if (!field) {
//     return null;
//   }
//   return <Details isSelected={true} type={field} />;
// };

// export const TestDetailsStory = () => {
//   const { getQueryField } = useTestSchema();
//   const field = getQueryField({ fieldName: 'test' });

//   if (!field) {
//     return null;
//   }
//   return <Details isSelected={true} type={field} />;
// };

export const Field = () => {
  const { queryType } = useTestSchema();
  const fields = queryType.getFields();
  return Object.keys(fields).map((key) => {
    return (
      <Details
        key={fields[key].name}
        isSelected={true}
        type={fields[key]}
        variant="FIELD"
      />
    );
  });
};

export const Argument = () => {
  const { getQueryField } = useTestSchema();
  const hasArgsField = getQueryField('hasArgs');
  return Object.keys(hasArgsField.args).map((key) => {
    return (
      <Details
        key={hasArgsField.args[key].name}
        isSelected={true}
        type={hasArgsField.args[key]}
        variant="ARGUMENT"
      />
    );
  });
};

export const InputObject = () => {
  const { getQueryField } = useTestSchema();
  const hasArgsField = getQueryField('hasArgs');
  return Object.keys(hasArgsField.args).map((k) => {
    if (isInputObjectType(hasArgsField.args[k].type)) {
      return (
        <Details
          key={hasArgsField.args[k].name}
          isSelected={true}
          type={hasArgsField.args[k]}
          variant="INPUT_OBJECT_TYPE"
        />
      );
    } else {
      return null;
    }
  });
};

export const InlineFragment = () => {
  const { getQueryField } = useTestSchema();
  const unionField = getQueryField('union');
  const unionMembers = (unionField.type as GraphQLUnionType).getTypes();

  // console.log('rendering UnionType', { unionMembers });

  return unionMembers.map((o) => (
    <Details key={o.name} isSelected={true} type={o} variant="INLINE_FRAGMENT" />
  ));
};
