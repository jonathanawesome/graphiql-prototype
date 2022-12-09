import { GraphQLArgument } from 'graphql';

// components
import { ArgumentsList } from '../ArgumentsList';
import { PaneSection } from './PaneSection';

// styles
import { StyledNullThing } from '../styles';

export const ArgumentsPaneSection = ({ args }: { args: readonly GraphQLArgument[] }) => {
  return (
    <>
      <PaneSection lead="Arguments">
        {args.length > 0 ? (
          <ArgumentsList
            args={args}
            resetTertiaryPaneOnClick={false}
            showBorder={true}
            showDescription={true}
          />
        ) : (
          <div className={StyledNullThing()}>This field has no arguments</div>
        )}
      </PaneSection>
    </>
  );
};
