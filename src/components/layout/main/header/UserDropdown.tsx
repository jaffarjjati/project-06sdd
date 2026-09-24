import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { menuItem, menuPanel } from "@/components/common/menuStyles";
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

interface UserDropdownProps {
  className?: string;
  logout?: () => void;
  userData?: Record<string, any> | null;
}

const dropdownList = [
  { name: "Settings", destination: "/settings", icon: Cog8ToothIcon },
  { name: "Logout", destination: "/logout", icon: ArrowRightOnRectangleIcon },
];

const UserDropdown: React.FC<UserDropdownProps> = ({
  className,
  logout,
  userData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMenu = (menuName: string) => {
    if (menuName === "Logout" && logout) {
      logout();
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-white/50 backdrop-blur-xl border border-white/70 shadow-sm rounded-3xl flex items-center space-x-2 whitespace-nowrap 
          overflow-hidden truncate hover:bg-rose-600 hover:text-white focus:ring-rose-300"
      >
        {/* <Image
          src={julian}
          alt="dropdown icon"
          className="w-5 h-5 rounded-full"
        /> */}
        <UserCircleIcon className="h-5 w-5" />
        <span className="text-sm hidden md:flex">
          {userData?.fullname ?? "who are you?"}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className={`${menuPanel} right-0 w-48`}>
          <ul className="flex flex-col gap-0.5">
            {dropdownList.map((menu, index) => {
              const IconComponent = menu.icon;

              const isLogout = menu.name === "Logout";

              return (
                <li
                  key={index}
                  className={menuItem}
                  onClick={() => handleMenu(menu.name)}
                >
                  {isLogout ? (
                    <div className="flex items-center space-x-2">
                      {IconComponent && <IconComponent className="h-5 w-5" />}
                      <span>{menu.name}</span>
                    </div>
                  ) : (
                    <Link href={menu.destination} passHref>
                      <div className="flex items-center space-x-2">
                        {IconComponent && <IconComponent className="h-5 w-5" />}
                        <span>{menu.name}</span>
                      </div>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
