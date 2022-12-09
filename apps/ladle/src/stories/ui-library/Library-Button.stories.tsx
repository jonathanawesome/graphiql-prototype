// ladle helper components
import { FlexCol } from '../../components/FlexCol';
import { FlexRow } from '../../components/FlexRow';

import { Button } from '@graphiql-prototype/ui-library';

const dummyAction = () => {
  alert('clicked button!');
};

export const Ghost = () => {
  return (
    <div className={FlexCol()}>
      <FlexRow name={`small - disabled`}>
        <Button
          action={dummyAction}
          isDisabled={true}
          label="Button Copy"
          size="SMALL"
          style="GHOST"
        />
      </FlexRow>
      <FlexRow name={`small`}>
        <Button action={dummyAction} label="Button Copy" size="SMALL" style="GHOST" />
      </FlexRow>
      <FlexRow name={`medium`}>
        <Button action={dummyAction} label="Button Copy" size="MEDIUM" style="GHOST" />
      </FlexRow>
      <FlexRow name={`large`}>
        <Button action={dummyAction} label="Button Copy" size="LARGE" style="GHOST" />
      </FlexRow>
    </div>
  );
};

export const Icon = () => {
  return (
    <div className={FlexCol()}>
      <FlexRow name={`small - disabled`}>
        <Button
          action={dummyAction}
          icon="Plus"
          isDisabled={true}
          label="Button Copy"
          size="SMALL"
          style="ICON"
        />
      </FlexRow>
      <FlexRow name={`small`}>
        <Button
          action={dummyAction}
          icon="Plus"
          label="Button Copy"
          size="SMALL"
          style="ICON"
        />
      </FlexRow>
      <FlexRow name={`medium`}>
        <Button
          action={dummyAction}
          icon="Close"
          label="Button Copy"
          size="MEDIUM"
          style="ICON"
        />
      </FlexRow>
      <FlexRow name={`large`}>
        <Button
          action={dummyAction}
          icon="Refresh"
          label="Button Copy"
          size="LARGE"
          style="ICON"
        />
      </FlexRow>
    </div>
  );
};
