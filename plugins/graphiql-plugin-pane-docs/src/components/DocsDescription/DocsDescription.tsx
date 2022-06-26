import MarkdownIt from 'markdown-it';

// styles
import { DocsDescriptionStyled, DD, DT } from './styles';

export const DocsDescription = ({ copy }: { copy: string }) => {
  const md = new MarkdownIt({});
  return (
    <DocsDescriptionStyled>
      <DT>Description</DT>
      <DD dangerouslySetInnerHTML={{ __html: md.render(copy) }} />
    </DocsDescriptionStyled>
  );
};
