import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  icon: LucideIcon;
  text: string;
  href: string;
}

export const NavLink = ({ icon, text, href }: NavLinkProps) => {
  const Icon = icon;

  const pathName = usePathname();

  const isActive = pathName === href;

  return (
    <Link href={href}>
      <div
        className={`flex flex-row items-center gap-2 py-3 px-5 rounded-full font-medium w-full 
        ${isActive ? 'bg-teal-400' : 'bg-neutral-900'}  
        hover:bg-teal-400 focus:outline-none mt-2`}
      >
        <div className="flex items-center justify-center">
          <Icon color={`${isActive ? '#171717' : 'white'}`} size={24} />
        </div>
        <div className="flex items-center justify-center">
          <span
            className={`${
              isActive ? 'text-neutral-900' : 'text-white'
            } font-medium`}
          >
            {text}
          </span>
        </div>
      </div>
    </Link>
  );
};
