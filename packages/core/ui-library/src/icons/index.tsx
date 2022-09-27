export * from './Check';
export * from './ChevronLarge';
export * from './ChevronSmall';
export * from './Close';
export * from './Code';
export * from './Command';
export * from './Docs';
export * from './Ellipsis';
export * from './Gear';
export * from './GraphQLIcon';
export * from './Input';
export * from './Play';
export * from './Plus';
export * from './Prettier';
export * from './Refresh';
export * from './SeparatorRound';

/* styles */
import { StyledIcon } from './styles';

/* props */
import { IconMap, IconProps } from './types';

export const Icon = ({ name }: IconProps) => {
  const TheIcon = IconMap[name];
  return (
    <StyledIcon>
      <TheIcon />
    </StyledIcon>
  );
};