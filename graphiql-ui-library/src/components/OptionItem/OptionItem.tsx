/** styles */
import { OptionRowStyled, OptionRowDetails } from './styles';

/** types */
import type { ToggleGroupProps } from '../ToggleGroup';

export const OptionItem = ({
  control,
  description,
  title,
}: {
  control: React.ReactElement<ToggleGroupProps>;
  description?: string;
  title: string;
}) => {
  // TODO should this be a DL?
  return (
    <OptionRowStyled>
      <OptionRowDetails>
        <span>{title}</span>
        {description && <span>{description}</span>}
      </OptionRowDetails>
      {control}
    </OptionRowStyled>
  );
};
