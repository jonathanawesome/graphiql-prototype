// components
import { ListItem } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';

// hooks
import { useTestSchema } from '@graphiql-v2-prototype/graphiql-test-schema';
import { GraphQLUnionType, isInputObjectType } from 'graphql';

export const Field = () => {
  const { queryType } = useTestSchema();
  const fields = queryType.getFields();

  return Object.keys(fields).map((key) => {
    return (
      <ListItem
        key={fields[key].name}
        // collapser={{c}}
        isSelected={true}
        // toggler={}
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
      <ListItem
        key={hasArgsField.args[key].name}
        // collapser={{c}}
        isSelected={true}
        // toggler={}
        type={hasArgsField.args[key]}
        variant="ARGUMENT"
      />
    );
  });
};

export const InputObject = () => {
  const { getQueryField } = useTestSchema();
  const hasArgsField = getQueryField('hasArgs');
  return Object.keys(hasArgsField.args).map((key) => {
    if (isInputObjectType(hasArgsField.args[key].type)) {
      return (
        <ListItem
          key={hasArgsField.args[key].name}
          // collapser={{c}}
          isSelected={true}
          // toggler={}
          type={hasArgsField.args[key]}
          variant="INPUT_OBJECT"
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
    <ListItem
      key={o.name}
      // collapser={{c}}
      isSelected={true}
      // toggler={}
      type={o}
      variant="INLINE_FRAGMENT"
    />
  ));
};
