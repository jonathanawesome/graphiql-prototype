import ReactMarkdown from 'react-markdown';

// styles
import { StyledMarkdown } from './styles';

export const Markdown = ({
  content,
  showSummary = false,
}: {
  content: string;
  showSummary?: boolean;
}) => {
  return (
    <div className={StyledMarkdown({ showSummary })}>
      <ReactMarkdown
        children={content}
        // transform all links within markdown to open externally
        linkTarget="_blank"
      />
    </div>
  );
};
