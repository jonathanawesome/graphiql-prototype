import ReactMarkdown from 'react-markdown';

// styles
import { StyledMarkdown } from './styles';

export const Markdown = ({ content }: { content: string }) => {
  return (
    <StyledMarkdown>
      <ReactMarkdown children={content} />
    </StyledMarkdown>
  );
};
