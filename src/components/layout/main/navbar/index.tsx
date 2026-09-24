import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/common/Button";
import {
  BookmarkIcon,
  HomeIcon,
  QueueListIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";

const menuList = [
  { name: "home", destination: "/", icon: HomeIcon },
  { name: "books", destination: "/books", icon: WindowIcon },
  {
    name: "borrow records",
    destination: "/borrow-records",
    icon: QueueListIcon,
  },
  { name: "bookmarks", destination: "/bookmarks", icon: BookmarkIcon },
];

interface NavbarProps {
  isSidebarOpen: boolean;
}

const Navbar = ({ isSidebarOpen }: NavbarProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  return (
    <nav className="flex">
      <ul className="font-medium md:flex md:flex-col md:space-y-0 space-y-2">
        {menuList.map((menu, index) => (
          <li key={index} className="relative md:pb-2">
            <Link href={menu.destination} passHref>
              <Button
                className={`left-3 rounded-3xl z-50 whitespace-nowrap overflow-hidden truncate
                  transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? "w-full justify-start!" : ""
                  } ${isActive(menu.destination) ? "bg-neutral-950! text-rose-200 -rotate-6 shadow-lg shadow-rose-900/30" : ""}`}
                icon={menu.icon}
                color="transparent"
                size="md"
                {...(isSidebarOpen ? { iconPosition: "left" } : {})}
              >
                {isSidebarOpen && menu.name}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
