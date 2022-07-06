import MarkdownIt from 'markdown-it';

// styles
import { DescriptionStyled, DD, DT } from './styles';

export const Description = ({ copy }: { copy: string }) => {
  const md = new MarkdownIt({});
  return (
    <DescriptionStyled>
      <DT>Description</DT>
      <DD dangerouslySetInnerHTML={{ __html: md.render(copy) }} />
    </DescriptionStyled>
  );
};
