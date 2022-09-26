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
    <StyledTag title={title} type={type}>
      {copy}
    </StyledTag>
  );
};
