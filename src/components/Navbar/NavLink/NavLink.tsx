import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  icon: LucideIcon;
  text: string;
  href: string;
}

const NavLink = ({ icon, text, href }: NavLinkProps) => {
  const Icon = icon;
  const pathName = usePathname();
  const isActive = pathName.includes(href);

  return (
    <Link href={href}>
      <div
        className={`flex flex-row items-center gap-2 py-2 px-5 rounded-full font-medium w-full
        ${isActive ? 'bg-primary' : 'bg-secondary'}
        hover:bg-primary focus:outline-none mt-2`}
      >
        <div className="flex items-center justify-center">
          <Icon
            className={`${
              isActive ? 'text-secondary' : 'text-white'
            } xxl:w-[20px] xxl:h-[20px] xl:w-[18px] xl:h-[18px] w-[16px] h-[16px]`}
          />
        </div>
        <div className="flex items-center justify-center">
          <span
            className={`${
              isActive ? 'text-secondary' : 'text-white'
            } font-medium text-xxs md:text-xs xl:text-sm xxl:text-base`}
          >
            {text}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NavLink;
