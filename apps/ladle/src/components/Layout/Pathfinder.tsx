import { Caret } from '@graphiql-prototype/graphiql-plugin-pane-pathfinder/src/icons';
import { SeparatorRound, css } from '@graphiql-prototype/ui-library';

const StyledPathfinder = css({
  all: 'unset',
  backgroundColor: 'pink',
  listStyleType: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const StyledListItem = css({
  backgroundColor: 'pink',
  fontSize: 14,
});

const StyledListItemControls = css({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

const StyledToggleButton = css({
  height: 16,
  width: 16,
  border: '1px solid blue',
  borderRadius: '50%',
});

const StyledCollapseButton = css({
  height: 16,
  width: 16,
  svg: {
    padding: 4,
  },
});

const StyledDetails = css({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

const StyledDescription = css({
  display: 'flex',
  alignItems: 'center',

  p: {
    all: 'unset',
  },
});

const StyledDescriptionSeparator = css({
  height: 16,
  width: 16,
  svg: {
    padding: 7,
  },
});

const StyledCollapsibleContent = css({
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
    <li className={StyledListItem()}>
      <div className={StyledListItemControls()}>
        <button
          aria-label="Toggle Field or Argument Name"
          aria-pressed="false"
          className={StyledToggleButton()}
          type="button"
        ></button>
        <button className={StyledCollapseButton()}>
          <Caret />
        </button>
        <div className={StyledDetails()}>
          <div>Name</div>
          <div>Type/DocsButton</div>
          <div className={StyledDescription()}>
            <div className={StyledDescriptionSeparator()}>
              <SeparatorRound />
            </div>
            <p>Description</p>
          </div>
        </div>
      </div>
      <div className={StyledCollapsibleContent()} id="collapsible-content">
        <ul>args?</ul>
        <ul>child fields</ul>
      </div>
    </li>
  );
};

export const Pathfinder = () => {
  return (
    <ul className={StyledPathfinder()}>
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
    </ul>
  );
};
