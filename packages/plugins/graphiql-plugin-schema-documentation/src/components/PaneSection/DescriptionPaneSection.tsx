import { Markdown } from '@graphiql-prototype/ui-library';

// components
import { PaneSection } from './PaneSection';

// styles
import { StyledNullThing } from '../styles';

export const DescriptionPaneSection = ({
  description,
}: {
  description: string | null | undefined;
}) => {
  return (
    <>
      <PaneSection lead="Description">
        {description ? (
          <Markdown content={description} />
        ) : (
          <div className={StyledNullThing()}>No description provided</div>
        )}
      </PaneSection>
    </>
  );
};
