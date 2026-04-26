import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { twJoin } from 'tailwind-merge';

interface MarkdownAnswerProps {
  answer: string;
}

const MarkdownAnswer = ({ answer }: MarkdownAnswerProps) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-[18px] md:text-[24px] leading-[24px] md:leading-[32px] font-bold mb-4 last:mb-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-[16px] md:text-[20px] leading-[22px] md:leading-[28px] font-bold mb-3 last:mb-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-[14px] md:text-[18px] leading-[20px] md:leading-[26px] font-bold mb-3 last:mb-0">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-[13px] md:text-[16px] leading-[18px] md:leading-[24px] font-semibold mb-2 last:mb-0">
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] font-semibold mb-2 last:mb-0">
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] font-semibold mb-2 last:mb-0">
            {children}
          </h6>
        ),
        p: ({ children }) => (
          <p className="text-[12px] md:text-[15px] leading-[20px] md:leading-[26px] font-normal mb-4 last:mb-0">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul
            className={twJoin(
              'text-[12px] md:text-[15px] leading-[16px] md:leading-[24px] font-normal',
              'list-disc list-outside space-y-1',
              'ml-2 pl-4 mb-4 last:mb-0'
            )}
          >
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol
            className={twJoin(
              'text-[12px] md:text-[15px] leading-[16px] md:leading-[24px] font-normal',
              'list-decimal list-outside space-y-1',
              'ml-2 pl-4 mb-4 last:mb-0'
            )}
          >
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li
            className="text-[12px] md:text-[15px] leading-[16px] md:leading-[24px] font-normal mb-1"
            {...props}
          >
            {children}
          </li>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className={twJoin(
              'text-[12px] md:text-[15px] leading-[16px] md:leading-[24px] underline',
              'text-blue-600 hover:text-blue-800'
            )}
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
              className={twJoin(
                'font-mono leading-relaxed',
                isInline
                  ? 'text-[12px] md:text-[14px] bg-gray-200 text-gray-400 px-2 py-1 rounded-md border'
                  : 'block text-[12px] md:text-[14px] bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 last:mb-0 overflow-x-auto border border-gray-700'
              )}
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre
            className={twJoin(
              'text-sm md:text-base bg-gray-900 text-gray-100 p-4 rounded-lg',
              'mb-4 last:mb-0 overflow-x-auto font-mono leading-relaxed',
              'border border-gray-700 shadow-lg'
            )}
          >
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote
            className={twJoin(
              'text-[12px] md:text-[15px] leading-[20px] md:leading-[26px] font-normal italic',
              'border-l-4 border-gray-300 pl-4 ml-2',
              'mb-4 last:mb-0'
            )}
          >
            {children}
          </blockquote>
        ),
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        hr: () => <hr className="border-t border-gray-300 my-4" />,
        table: ({ children, node, ...props }) => {
          const caption = (node as any)?.data?.hProperties?.[
            'data-caption'
          ];

          return (
            <div className="mb-4 last:mb-0">
              {caption && (
                <p
                  className={twJoin(
                    'text-[12px] leading-[16px] font-semibold',
                    'text-center mb-1 text-gray-200'
                  )}
                >
                  {caption}
                </p>
              )}
              <table
                className={twJoin(
                  'text-[13px] md:text-[15px] border-collapse border border-gray-500',
                  'w-full rounded-lg overflow-hidden shadow-sm bg-gray-650'
                )}
                {...props}
              >
                {children}
              </table>
            </div>
          );
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        thead: ({ children, node, ...props }) => (
          <thead className="bg-gray-700" {...props}>
            {children}
          </thead>
        ),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tbody: ({ children, node, ...props }) => (
          <tbody className="bg-gray-650" {...props}>
            {children}
          </tbody>
        ),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tr: ({ children, node, ...props }) => (
          <tr
            className={twJoin(
              'border-b border-gray-500',
              'transition-colors hover:bg-gray-600'
            )}
            {...props}
          >
            {children}
          </tr>
        ),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        th: ({ children, node, ...props }) => (
          <th
            className={twJoin(
              'border border-gray-500 px-4 py-3',
              'text-left font-semibold text-gray-200 bg-gray-700'
            )}
            {...props}
          >
            {children}
          </th>
        ),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        td: ({ children, node, ...props }) => (
          <td
            className={twJoin(
              'border border-gray-500 px-4 py-3',
              'text-gray-200 leading-relaxed bg-gray-400'
            )}
            {...props}
          >
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
