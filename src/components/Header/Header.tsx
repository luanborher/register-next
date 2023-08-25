import Image from 'next/image';

import { Moon, Bell } from 'lucide-react';

interface HeaderProps {
  profile?: boolean;
  title: string;
  subtitle?: string;
  action?: boolean;
  children?: React.ReactNode;
}

const Header = ({
  profile,
  title,
  subtitle,
  action,
  children
}: HeaderProps) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col w-full gap-1 border-2">
        <span className="text-black text-xl md:text-2xl xxl:text-3xl font-medium">
          {title}
        </span>

        {subtitle && (
          <span className="text-black text-xs md:text-sm xxl:text-base font-medium">
            {subtitle}
          </span>
        )}
      </div>

      {profile && (
        <div className="flex flex-row w-[400px] border-2 items-center justify-center gap-2">
          <div className="flex justify-center items-center w-[30px] h-[30px] bg-grayLight rounded-full text-black hover:bg-gray hover:text-white cursor-pointer">
            <Moon className="w-[15px] h-[15px]" />
          </div>
          <div className="flex justify-center items-center w-[30px] h-[30px] bg-grayLight rounded-full text-black hover:bg-gray hover:text-white cursor-pointer">
            <Bell className="w-[15px] h-[15px]" />
          </div>

          <Image
            src={'/assets/no-user.jpg'}
            alt="User"
            width={45}
            height={45}
            className="rounded-full ml-2 cursor-pointer hover:opacity-80 h-[45px] w-[45px]"
          />

          <div className="flex flex-col">
            <span className="text-black text-xs md:text-sm xxl:base font-medium cursor-pointer hover:opacity-80">
              Administrador
            </span>

            <span className="text-black text-xxs md:text-xs xxl:text-sm font-normal cursor-pointer hover:opacity-80">
              administrador@gmail.com
            </span>
          </div>
        </div>
      )}

      {action && (
        <div className="flex flex-row w-[400px] border-2 items-center justify-end gap-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default Header;
