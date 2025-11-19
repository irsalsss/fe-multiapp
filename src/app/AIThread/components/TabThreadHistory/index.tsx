import { twJoin, twMerge } from 'tailwind-merge';

interface TabThreadHistoryProps {
  title: string;
  total?: number;
  icon: React.ReactNode;
  onClick?: VoidFunction;
  active?: boolean;
}

const TabThreadHistory = ({
  title,
  total,
  icon,
  onClick,
  active,
}: TabThreadHistoryProps) => {
  const activeClass = active
    ? 'bg-gray-700 text-green-100'
    : 'hover:bg-gray-700/15 text-white hover:text-green-100';

  const activeTotalClass = active ? 'bg-green-300' : 'group-hover:bg-green-300';

  return (
    <div
      role="button"
      onClick={onClick}
      className={twMerge(
        activeClass,
        'flex uppercase justify-center transition-all duration-300',
        'items-center w-full rounded-[6px] gap-2 cursor-pointer py-3 px-6 group'
      )}
    >
      {icon}
      <span
        className={twJoin(
          'text-[10px] leading-[8px] font-semibold',
          'group-hover:text-green-100'
        )}
      >
        {title}
      </span>
      <span
        className={twMerge(
          'py-[2px] font-semibold rounded-[4px]',
          'text-[10px] leading-[12px] bg-gray-400 px-1',
          activeTotalClass
        )}
      >
        {total ?? 0}
      </span>
    </div>
  );
};

export default TabThreadHistory;
