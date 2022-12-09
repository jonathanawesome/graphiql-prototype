/* styles */
import { StyledIcon } from './styles';

/* props */
import { IconMap, IconProps } from './types';

export const Icon = ({ name }: IconProps) => {
  const TheIcon = IconMap[name];
  return (
    <div className={StyledIcon()}>
      <TheIcon />
    </div>
  );
};
