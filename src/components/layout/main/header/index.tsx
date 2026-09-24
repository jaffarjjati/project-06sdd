import { useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import UserDropdown from "./UserDropdown";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const hasHydrated = useHasHydrated();
  const [search, setValue] = useState("");
  const { isSidebarOpen } = useSidebar();
  const { userData, logout } = useAuthStore();
  const router = useRouter();

  if (!hasHydrated) return null;

  const login = () => {
    router.push("/login");
  };
  const signUp = () => {
    router.push("/sign-up");
  };

  const handleNotification = () => {};

  return (
    <header
      className={`fixed z-30 py-4 pl-2 transition-all duration-300 w-full ${
        isSidebarOpen ? "pr-60" : "pr-28"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0 max-w-sm rounded-full bg-white/50 backdrop-blur-xl shadow-sm">
          <InputText
            className="border-white/70!"
            placeholder="Search book names, authors, genres"
            icon={MagnifyingGlassIcon}
            iconPosition="left"
            value={search}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div
          className={`${isSidebarOpen ? "hidden sm:flex" : "flex"} ml-auto shrink-0 items-center gap-2`}
        >
          {userData ? (
            <UserDropdown logout={logout} userData={userData} />
          ) : (
            <div className="flex items-center p-1 rounded-full bg-white/50 backdrop-blur-xl border border-white/70 shadow-sm">
              <Button
                className="rounded-full whitespace-nowrap text-sm! px-3! sm:px-4! py-1.5!"
                color="transparent"
                onClick={login}
              >
                Login
              </Button>
              <Button
                className="rounded-full whitespace-nowrap text-sm! px-3! sm:px-4! py-1.5! hover:bg-rose-600! hover:-rotate-3 transition-all!"
                color="black"
                onClick={signUp}
              >
                Sign Up
              </Button>
            </div>
          )}
          <span className="hidden sm:block">
            <Button
              className="rounded-full bg-white/50! backdrop-blur-xl border border-white/70 shadow-sm"
              icon={BellIcon}
              color="transparent"
              onClick={handleNotification}
            />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
