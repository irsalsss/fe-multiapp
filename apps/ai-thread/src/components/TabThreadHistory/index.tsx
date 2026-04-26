import { twJoin, twMerge } from 'tailwind-merge';

interface TabThreadHistoryProps {
  title: string;
  total?: number;
  icon: React.ReactNode;
  onClick?: VoidFunction;
  active?: boolean;
  className?: string;
  isSidebarCollapsed?: boolean;
}

const TabThreadHistory = ({
  title,
  total,
  icon,
  onClick,
  active,
  className,
  isSidebarCollapsed,
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
        'items-center w-full rounded-[6px] gap-2 cursor-pointer py-3 px-6 group',
        className
      )}
    >
      {icon}
      {!isSidebarCollapsed && (
        <span
          className={twJoin(
            'text-[10px] md:text-[12px] leading-[8px] md:leading-[16px] font-semibold',
            'group-hover:text-green-100'
          )}
        >
          {title}
        </span>
      )}
      {!isSidebarCollapsed && (
        <span
          className={twMerge(
            'py-[2px] font-semibold rounded-[4px]',
            'text-[10px] md:text-[12px] leading-[12px] md:leading-[16px] bg-gray-400 px-1',
            activeTotalClass
          )}
        >
          {total || 0}
        </span>
      )}
    </div>
  );
};

export default TabThreadHistory;
