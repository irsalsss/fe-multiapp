import { twMerge } from 'tailwind-merge';
import { TrashIcon, BookmarkIcon } from '@radix-ui/react-icons';
import KebabMenuIcon from '../../../../assets/icons/kebab-menu-black.svg?react';
import ButtonIcon from '../ButtonIcon';
import { ButtonSize, ButtonType } from '../ButtonIcon/types';
import { useState } from 'react';
import { useClickOutside } from '@mantine/hooks';

const DropdownChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  const ref = useClickOutside(() => {
    setIsOpen(false);
  });

  const handleSaveChat = () => {
    console.log('save chat');
  };

  const handleDeleteChat = () => {
    console.log('delete chat');
  };

  const items = [
    {
      value: 'save',
      label: 'Save Chat',
      icon: <BookmarkIcon />,
      onClick: handleSaveChat,
    },
    {
      value: 'delete',
      label: 'Delete Chat',
      icon: <TrashIcon />,
      onClick: handleDeleteChat,
    },
  ];

  return (
    <div className="relative">
      <ButtonIcon
        type={ButtonType.Tertiary}
        size={ButtonSize.Medium}
        icon={
          <KebabMenuIcon className="cursor-pointer hover:scale-110 transition-all duration-300" />
        }
        onClick={handleOpenDropdown}
      />

      <div
        ref={ref}
        className={twMerge(
          'absolute top-10 w-[140px] right-0 z-10 bg-gray-700 border border-gray-500 rounded-lg opacity-0 transition-all duration-300',
          isOpen && 'opacity-100'
        )}
      >
        <ul className="flex flex-col gap-2 p-2">
          {items.map((item) => (
            <li
              key={item.value}
              className="flex items-center gap-2 transition-all duration-300 p-2 text-gray-300 hover:text-white cursor-pointer text-[12px] leading-[20px]"
              onClick={item.onClick}
              role="button"
              tabIndex={0}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownChat;
