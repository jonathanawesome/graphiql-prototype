// components
import {
  Ellipsis,
  OptionItem,
  Popover,
  ToggleGroup,
} from '@graphiql-prototype/ui-library';

// hooks
import { DescriptionsVisibility, FieldsVisibility, usePathfinder } from '../../hooks';

// styles
import { OptionsContentStyled } from './styles';

const OptionsContent = () => {
  const {
    descriptionsVisibility,
    fieldsVisibility,
    setDescriptionsVisibility,
    setFieldsVisibility,
  } = usePathfinder();

  return (
    <OptionsContentStyled>
      <OptionItem
        title="Field Visibility"
        description="Show only selected fields"
        control={
          <ToggleGroup
            ariaLabel="Fields visibility"
            defaultValue={`Off`}
            items={[
              { ariaLabel: 'Show only selected fields', value: 'On' },
              { ariaLabel: 'Show all fields', value: 'Off' },
            ]}
            onChange={(value) => setFieldsVisibility(value as FieldsVisibility)}
            size="regular"
            value={fieldsVisibility}
          />
        }
      />
      <OptionItem
        title="Descriptions"
        description="Adjust visibility and display of descriptions"
        control={
          <ToggleGroup
            ariaLabel="Description visibility"
            defaultValue={`Inline`}
            items={[
              { ariaLabel: 'Descriptions below item details', value: 'Below' },
              { ariaLabel: 'Descriptions inline with item details', value: 'Inline' },
              { ariaLabel: 'Descriptions hidden', value: 'Off' },
            ]}
            onChange={(value) =>
              setDescriptionsVisibility(value as DescriptionsVisibility)
            }
            size="regular"
            value={descriptionsVisibility}
          />
        }
      />
    </OptionsContentStyled>
  );
};

export const Options = () => {
  return <Popover content={<OptionsContent />} icon={<Ellipsis />} />;
};
