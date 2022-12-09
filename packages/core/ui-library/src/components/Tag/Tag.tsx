// styles
import { StyledTag } from './styles';

export const Tag = ({
  copy,
  title,
  type,
}: {
  copy: string;
  title: string;
  type: 'ERROR' | 'SUCCESS' | 'WARNING' | 'INFO' | 'OPERATION';
}) => {
  return (
    <span className={StyledTag({ type })} title={title}>
      {copy}
    </span>
  );
};
