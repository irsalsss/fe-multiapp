import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownAnswerProps {
  answer: string;
}

const MarkdownAnswer = ({ answer }: MarkdownAnswerProps) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-[18px] leading-[24px] font-bold mb-4 last:mb-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-[16px] leading-[22px] font-bold mb-3 last:mb-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-[14px] leading-[20px] font-bold mb-3 last:mb-0">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-[13px] leading-[18px] font-semibold mb-2 last:mb-0">
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-[12px] leading-[16px] font-semibold mb-2 last:mb-0">
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-[12px] leading-[16px] font-semibold mb-2 last:mb-0">
            {children}
          </h6>
        ),
        p: ({ children }) => (
          <p className="text-[12px] leading-[20px] font-normal mb-4 last:mb-0">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="text-[12px] leading-[16px] font-normal list-disc list-outside space-y-1 ml-2 pl-4 mb-4 last:mb-0">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="text-[12px] leading-[16px] font-normal list-decimal list-outside space-y-1 ml-2 pl-4 mb-4 last:mb-0">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-[12px] leading-[16px] font-normal mb-1">
            {children}
          </li>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-[12px] leading-[16px] text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        code: ({ children, ...props }) => {
          const isInline = !props.className?.includes('language-');
          return (
            <code
              className={`${
                isInline
                  ? 'text-[11px] bg-gray-100 px-1 py-0.5 rounded'
                  : 'block text-[11px] bg-gray-100 p-2 rounded mb-4 last:mb-0 overflow-x-auto'
              } font-mono`}
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="text-[11px] bg-gray-100 p-2 rounded mb-4 last:mb-0 overflow-x-auto font-mono">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="text-[12px] leading-[20px] font-normal border-l-4 border-gray-300 pl-4 ml-2 mb-4 last:mb-0 italic">
            {children}
          </blockquote>
        ),
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        hr: () => <hr className="border-t border-gray-300 my-4" />,
        table: ({ children }) => (
          <table className="text-[13px] border-collapse border border-gray-300 mb-4 last:mb-0 w-full rounded-lg overflow-hidden shadow-sm">
            {children}
          </table>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50">{children}</thead>
        ),
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => (
          <tr className="border-b border-gray-200 transition-colors">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700 bg-gray-100">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-gray-200 px-4 py-3 text-gray-800 leading-relaxed">
            {children}
          </td>
        ),
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="max-w-full h-auto mb-4 last:mb-0 rounded"
          />
        ),
      }}
    >
      {answer}
    </Markdown>
  );
};

export default MarkdownAnswer;
