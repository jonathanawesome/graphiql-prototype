import { Switch, styled } from '@graphiql-prototype/ui-library';
import { useState } from 'react';

const FlexRow = styled('div', {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
});

const FlexCol = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

const dummyAction = () => {
  alert('clicked button!');
};

export const Switches = () => {
  const [value, setValue] = useState<boolean>(false);
  return (
    <FlexCol>
      <FlexRow>
        <span>small</span>
        <Switch
          handleChange={setValue}
          isChecked={value}
          name={`some-name1`}
          size="SMALL"
        />
      </FlexRow>
      <FlexRow>
        <span>large</span>
        <Switch
          handleChange={setValue}
          isChecked={value}
          name={`some-name2`}
          size="LARGE"
        />
      </FlexRow>
    </FlexCol>
  );
};
