import Markdown from 'react-markdown';

interface MarkdownAnswerProps {
  answer: string;
}

const MarkdownAnswer = ({ answer }: MarkdownAnswerProps) => {
  return (
    <Markdown
      components={{
        p: ({ children }) => (
          <p className="text-[12px] leading-[20px] font-normal mb-4 last:mb-0">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="text-[12px] leading-[16px] font-normal list-decimal list-outside space-y-4 ml-2 pl-2 mb-4 last:mb-0">
            {children}
          </ul>
        ),
        li: ({ children }) => (
          <li className="text-[12px] leading-[16px] font-normal ml-2 mb-2">
            {children}
          </li>
        ),
      }}
    >
      {answer}
    </Markdown>
  );
};

export default MarkdownAnswer;
