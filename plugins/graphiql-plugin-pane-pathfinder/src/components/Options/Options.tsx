import React from 'react';
import {
  Ellipsis,
  Popover,
  ToggleGroup,
  ToggleGroupProps,
} from '@graphiql-v2-prototype/graphiql-ui-library';

/** hooks */
import { DescriptionsVisibility, PillsVisibility, usePathfinder } from '../../hooks';

/** styles */
import { OptionsContentStyled, OptionRowStyled, OptionRowDetails } from './styles';

const OptionRow = ({
  title,
  description,
  control,
}: {
  title: string;
  description: string;
  control: React.ReactElement<ToggleGroupProps>;
}) => {
  // TODO should this be a DL?
  return (
    <OptionRowStyled>
      <OptionRowDetails>
        <span>{title}</span>
        <span>{description}</span>
      </OptionRowDetails>
      {control}
    </OptionRowStyled>
  );
};

const OptionsContent = () => {
  const {
    descriptionsVisibility,
    pillsVisibility,
    setDescriptionsVisibility,
    setPillsVisibility,
  } = usePathfinder();

  return (
    <OptionsContentStyled>
      <OptionRow
        title="Type Pills"
        description="Show or hide type pills"
        control={
          <ToggleGroup
            ariaLabel="Type pills visibility"
            defaultValue={`Off`}
            value={pillsVisibility}
            items={[
              { ariaLabel: 'Do not display type pills', value: 'Off' },
              { ariaLabel: 'Display type pills', value: 'On' },
            ]}
            onChange={(value) => setPillsVisibility(value as PillsVisibility)}
          />
        }
      />
      <OptionRow
        title="Descriptions"
        description="Adjust visibility and display of descriptions"
        control={
          <ToggleGroup
            ariaLabel="Description visibility"
            defaultValue={`Inline`}
            value={descriptionsVisibility}
            items={[
              { ariaLabel: 'Descriptions below item details', value: 'Below' },
              { ariaLabel: 'Descriptions inline with item details', value: 'Inline' },
              { ariaLabel: 'Descriptions hidden', value: 'Off' },
            ]}
            onChange={(value) =>
              setDescriptionsVisibility(value as DescriptionsVisibility)
            }
          />
        }
      />
    </OptionsContentStyled>
  );
};

export const Options = () => {
  return <Popover content={<OptionsContent />} icon={<Ellipsis />} />;
};
