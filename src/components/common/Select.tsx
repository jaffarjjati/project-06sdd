import { useState, useRef, useEffect } from "react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { menuItem, menuItemSelected, menuPanel } from "./menuStyles";

interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SelectProps {
  options: Option[];
  defaultOption?: string;
  withIcons?: boolean;
  className?: string;
  onChange: (selectedValue: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  defaultOption = "Select an option",
  withIcons = false,
  className = "",
  onChange,
}) => {
  const [selected, setSelected] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    setSelected(option.label);
    setIsOpen(false);
    onChange(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 bg-white/85 text-neutral-900 border border-white/70 shadow-sm rounded-full flex justify-between items-center text-sm
        hover:bg-white focus:ring-1 focus:ring-rose-300 transition"
      >
        <span>{selected}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-rose-600 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isOpen && (
        <div className={`${menuPanel} left-0 w-full`}>
          <ul className="flex flex-col gap-0.5">
            {options.map((option) => {
              const IconComponent = withIcons ? option.icon : null;

              return (
                <li
                  key={option.value}
                  className={`${menuItem} ${option.label === selected ? menuItemSelected : ""}`}
                  onClick={() => handleSelect(option)}
                >
                  {withIcons && IconComponent && (
                    <IconComponent className="h-5 w-5" />
                  )}
                  <span>{option.label}</span>
                  {option.label === selected && (
                    <CheckIcon className="ml-auto h-4 w-4" />
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

export default Select;
