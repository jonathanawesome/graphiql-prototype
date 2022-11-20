// ladle helper components
import { FlexCol } from '../../components/FlexCol';
import { FlexRow } from '../../components/FlexRow';

import { Spinner } from '@graphiql-prototype/ui-library';

export const SpinnerStory = () => {
  return (
    <FlexCol>
      <FlexRow name={`spinner`}>
        <Spinner />
      </FlexRow>
      <FlexRow name={`spinner2`}>
        <Spinner />
      </FlexRow>
    </FlexCol>
  );
};

SpinnerStory.storyName = 'Spinner';

export default {
  title: 'Ui Library/Spinner',
  component: SpinnerStory,
  tags: ['docsPage'],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};
