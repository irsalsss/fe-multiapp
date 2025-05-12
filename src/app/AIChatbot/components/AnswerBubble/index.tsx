import ChatGPT from '../../../../assets/icons/chat-gpt.svg';
import { format } from 'date-fns';

const AnswerBubble = () => {
  return (
    <div className="bg-gray-400 px-[22px] py-3 rounded-lg relative">
      <img
        src={ChatGPT}
        alt="chat-gpt"
        className="absolute top-[-16px] left-[-16px] rounded-lg h-8 w-8"
      />
      <div className="flex gap-2 items-center absolute top-[-16px]">
        <span className="text-[12px] leading-[16px] font-semibold">
          Response
        </span>
        <span className="text-[8px] leading-[8px] text-gray-200 opacity-60">
          {format(new Date(), 'dd MMM ▪ hh:mm a')}
        </span>
      </div>
      <p className="text-[12px] leading-[16px] font-normal">
        Usability testing is a technique used in user experience (UX) design to
        evaluate a product or service by testing it with representative users.
        The purpose of usability testing is to identify any usability problems,
        collect quantitative and qualitative data on users' experiences, and
        determine the overall user satisfaction with the product or service.
      </p>
    </div>
  );
};

export default AnswerBubble;
