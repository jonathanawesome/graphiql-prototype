// styles
import { StyledTag } from './styles';

export const Tag = ({
  copy,
  type,
}: {
  copy: string;
  type: 'ERROR' | 'SUCCESS' | 'WARNING' | 'INFO' | 'OPERATION';
}) => {
  return <StyledTag type={type}>{copy}</StyledTag>;
};
