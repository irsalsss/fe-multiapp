const TodayDivider = () => {
  return (
    <div className="flex items-center w-full gap-[10px]">
      <div className="w-full h-[1px] bg-gray-400" />
      <span className="text-[10px] leading-[8px] text-gray-200 opacity-60">
        Today
      </span>
      <div className="w-full h-[1px] bg-gray-400" />
    </div>
  );
};

export default TodayDivider;
