import { useState } from 'react';

// ladle helper components
import { FlexCol } from '../../components/FlexCol';
import { FlexRow } from '../../components/FlexRow';

import { Switch } from '@graphiql-prototype/ui-library';

export const Switches = () => {
  const [value, setValue] = useState<boolean>(false);

  const handleChange = ({
    // name,
    value,
  }: {
    // name: string;
    value: string | string[] | boolean;
  }) => {
    setValue(!!value);
  };

  return (
    <div className={FlexCol()}>
      <FlexRow name="small">
        <Switch
          handleChange={handleChange}
          isChecked={value}
          name={`some-name1`}
          size="SMALL"
        />
      </FlexRow>
      <FlexRow name="medium">
        <Switch
          handleChange={handleChange}
          isChecked={value}
          name={`some-name1`}
          size="MEDIUM"
        />
      </FlexRow>
      <FlexRow name="large">
        <Switch
          handleChange={handleChange}
          isChecked={value}
          name={`some-name2`}
          size="LARGE"
        />
      </FlexRow>
    </div>
  );
};
