import { Caret } from '@graphiql-prototype/graphiql-plugin-pane-pathfinder/src/icons';
import { SeparatorRound, styled } from '@graphiql-prototype/ui-library';

const PathfinderStyled = styled('ul', {
  all: 'unset',
  backgroundColor: 'pink',
  listStyleType: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const ListItemStyled = styled('li', {
  backgroundColor: 'pink',
  fontSize: 14,
});

const ListItemControls = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

const ToggleButton = styled('button', {
  height: 16,
  width: 16,
  border: '1px solid blue',
  borderRadius: '50%',
});

const CollapseButton = styled('button', {
  height: 16,
  width: 16,
  svg: {
    padding: 4,
  },
});

const Details = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

const Description = styled('div', {
  display: 'flex',
  alignItems: 'center',

  p: {
    all: 'unset',
  },
});

const DescriptionSeparator = styled('div', {
  height: 16,
  width: 16,
  svg: {
    padding: 7,
  },
});

const CollapsibleContent = styled('div', {
  marginLeft: 24,
  ul: {
    all: 'unset',
    backgroundColor: 'pink',
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});

const ListItem = () => {
  return (
    <ListItemStyled>
      <ListItemControls>
        <ToggleButton
          aria-label="Toggle Field or Argument Name"
          aria-pressed="false"
          type="button"
        ></ToggleButton>
        <CollapseButton>
          <Caret />
        </CollapseButton>
        <Details>
          <div>Name</div>
          <div>Type/DocsButton</div>
          <Description>
            <DescriptionSeparator>
              <SeparatorRound />
            </DescriptionSeparator>
            <p>Description</p>
          </Description>
        </Details>
      </ListItemControls>
      <CollapsibleContent id="collapsible-content">
        <ul>args?</ul>
        <ul>child fields</ul>
      </CollapsibleContent>
    </ListItemStyled>
  );
};

export const Pathfinder = () => {
  return (
    <PathfinderStyled>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </PathfinderStyled>
  );
};
