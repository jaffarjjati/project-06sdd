"use client";
import { useState, useRef, useEffect } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { menuItem, menuItemSelected, menuPanel } from "./menuStyles";

interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues?: string[];
  className?: string;
  withIcons?: boolean;
  onChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues = [],
  className = "",
  withIcons = false,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>(
    options.filter((opt) => selectedValues.includes(opt.value))
  );
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    if (!selected.find((s) => s.value === option.value)) {
      const newSelected = [...selected, option];
      setSelected(newSelected);
      onChange(newSelected.map((s) => s.value));
    }
  };

  const handleRemove = (value: string) => {
    const newSelected = selected.filter((s) => s.value !== value);
    setSelected(newSelected);
    onChange(newSelected.map((s) => s.value));
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
        className="w-full min-h-[42px] px-3 py-2 bg-white border border-gray-300 rounded-full flex flex-wrap gap-1 items-center text-sm hover:bg-rose-50 focus:ring-1 focus:ring-rose-300 transition"
      >
        {selected.length === 0 && (
          <span className="text-gray-400">Select genres...</span>
        )}
        {selected.map((option) => (
          <span
            key={option.value}
            className="bg-yellow-300 text-neutral-950 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider -rotate-2 flex items-center gap-1"
          >
            {option.label}
            <XMarkIcon
              className="h-4 w-4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(option.value);
              }}
            />
          </span>
        ))}
        <div className="ml-auto">
          <ChevronDownIcon
            className={`h-5 w-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className={`${menuPanel} left-0 w-full`}>
          <ul className="flex flex-col gap-0.5 max-h-60 overflow-auto">
            {options.map((option) => {
              const isSelected = selected.some((s) => s.value === option.value);
              const IconComponent = withIcons ? option.icon : null;

              return (
                <li
                  key={option.value}
                  className={`${menuItem} ${isSelected ? `${menuItemSelected} pointer-events-none` : ""}`}
                  onClick={() => handleSelect(option)}
                >
                  {withIcons && IconComponent && (
                    <IconComponent className="h-5 w-5" />
                  )}
                  <span>{option.label}</span>
                  {isSelected && <CheckIcon className="ml-auto h-4 w-4" />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
