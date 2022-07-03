import { useState } from 'react';
import {
  DescriptionListItem,
  DescriptionListItemProps,
  styled,
} from '@graphiql-v2-prototype/graphiql-ui-library';

const FlexColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

const GridRow = styled('div', {
  display: 'grid',
  gridTemplateColumns: '200px minmax(300px, 1fr)',
  gap: 24,
});

const Note = styled('span', {
  display: 'flex',
  fontSize: 13,
  color: '$gray060',
  borderRight: '1px solid $gray010',
  paddingRight: 4,
  marginRight: 12,
});

const Component: React.FC<{ note: string }> = ({ children, note }) => {
  return (
    <GridRow>
      <Note>{note}</Note>
      {children}
    </GridRow>
  );
};

export const DescriptionListItemStory = () => {
  const [descriptionPlacement, setDescriptionPlacement] =
    useState<DescriptionListItemProps['descriptionPlacement']>('Inline');

  return (
    <FlexColumn>
      <button onClick={() => setDescriptionPlacement('Below')}>
        Set descriptionPlacement "Below"
      </button>
      <button onClick={() => setDescriptionPlacement('Inline')}>
        Set descriptionPlacement "Inline"
      </button>
      <Component note="Base">
        <DescriptionListItem
          name={`name`}
          description={`description`}
          descriptionPlacement={descriptionPlacement}
          type={`type`}
        />
      </Component>
      <Component note="FIELD entityType, selected">
        <DescriptionListItem
          name={`name`}
          description={`GraphQL interfaces represent a list of named fields and their arguments. GraphQL objects and interfaces can then implement these interfaces which requires that the implementing type will define all fields defined by those interfaces.`}
          descriptionPlacement={descriptionPlacement}
          entityType="FIELD"
          isSelected={true}
          type={`type`}
        />
      </Component>
      <Component note="FIELD entityType, selected">
        <DescriptionListItem
          name={`name`}
          description={`GraphQL interfaces represent a list of named fields and their arguments. GraphQL objects and interfaces can then implement these interfaces which requires that the implementing type will define all fields defined by those interfaces.`}
          descriptionPlacement={descriptionPlacement}
          entityType="FIELD"
          isSelected={true}
          type={`type`}
        />
      </Component>
      <Component note="ARGUMENT entityType, selected">
        <DescriptionListItem
          name={`name`}
          description={`Fields on a GraphQL interface have the same rules as fields on a GraphQL object; their type can be Scalar, Object, Enum, Interface, or Union, or any wrapping type whose base type is one of those five.`}
          descriptionPlacement={descriptionPlacement}
          entityType="ARGUMENT"
          isSelected={true}
          type={`type`}
        />
      </Component>
      <Component note="INLINE_FRAGMENT entityType, selected">
        <DescriptionListItem
          name={`name`}
          description={`For example, an interface NamedEntity may describe a required field and types such as Person or Business may then implement this interface to guarantee this field will always exist.`}
          descriptionPlacement={descriptionPlacement}
          entityType="INLINE_FRAGMENT"
          isSelected={true}
          type={`type`}
        />
      </Component>
      <Component note="INPUT_TYPE entityType, selected">
        <DescriptionListItem
          name={`name`}
          description={`Types may also implement multiple interfaces. For example, Business implements both the NamedEntity and ValuedEntity interfaces in the example below.`}
          descriptionPlacement={descriptionPlacement}
          entityType="INPUT_TYPE"
          isSelected={true}
          type={`type`}
        />
      </Component>
      <Component note="Type as button">
        <DescriptionListItem
          name={`name`}
          description={`Types may also implement multiple interfaces. For example, Business implements both the NamedEntity and ValuedEntity interfaces in the example below.`}
          descriptionPlacement={descriptionPlacement}
          isSelected={true}
          type={<button onClick={() => alert('click!')}>type</button>}
        />
      </Component>
    </FlexColumn>
  );
};
DescriptionListItemStory.storyName = 'DescriptionListItem';
