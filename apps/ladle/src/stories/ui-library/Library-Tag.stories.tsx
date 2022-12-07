// ladle helper components
import { FlexCol } from '../../components/FlexCol';
import { FlexRow } from '../../components/FlexRow';

import { Tag } from '@graphiql-prototype/ui-library';

export const TagStory = () => {
  return (
    <div className={FlexCol()}>
      <FlexRow name="OPERATION">
        <Tag copy="Q" title="Query" type="OPERATION" />
      </FlexRow>
      <FlexRow name="ERROR">
        <Tag copy="E" title="ERROR" type="ERROR" />
      </FlexRow>
      <FlexRow name="WARNING">
        <Tag copy="W" title="WARNING" type="WARNING" />
      </FlexRow>
      <FlexRow name="INFO">
        <Tag copy="I" title="INFO" type="INFO" />
      </FlexRow>
      <FlexRow name="SUCCESS">
        <Tag copy="S" title="SUCCESS" type="SUCCESS" />
      </FlexRow>
    </div>
  );
};
