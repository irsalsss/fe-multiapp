import Avatar from '../../../../assets/illus/avatar-man.png';
import { format } from 'date-fns';

const QuestionBubble = () => {
  return (
    <div className="bg-gray-400 px-[22px] py-3 rounded-lg relative">
      <img src={Avatar} alt="avatar" className="absolute top-[-16px] left-[-16px] rounded-lg h-8 w-8" />
      <div className='flex gap-2 items-center absolute top-[-16px]'>
        <span className="text-[12px] leading-[16px] font-semibold">You</span>
        <span className='text-[8px] leading-[8px] text-gray-200 opacity-60'>{format(new Date(), 'dd MMM ▪ hh:mm a')}</span>
      </div>
      <p className="text-[12px] leading-[16px] font-normal">Question Bubble</p>
    </div>
  )
}

export default QuestionBubble;