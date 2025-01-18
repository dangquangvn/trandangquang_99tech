import { TokenIcon } from "@web3icons/react";
import React, { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

export interface OptionProps {
  value: string;
  label: string;
  price: number;
  icon?: ReactNode;
}

interface SelectProps {
  options: OptionProps[];
  value: OptionProps;
  onChange: (value: OptionProps) => void;
  placeholder?: string;
  defaultValue?: OptionProps; // Add defaultValue prop
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<OptionProps>(value);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search query
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown if clicked outside
  const handleClickOutside = (e: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(e.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Initialize with defaultValue if provided
  useEffect(() => {
    if (defaultValue && !value.value) {
      setSelectedValue(defaultValue);
      onChange(defaultValue);
    }
  }, [defaultValue]);

  const dropdown = isOpen && (
    <div
      ref={dropdownRef}
      // className="absolute z-50 mt-2 bg-gray-900 bg-opacity-80 backdrop-blur-md border border-gray-700 border-opacity-30 rounded-lg shadow-lg w-40 max-h-40 overflow-y-auto"
      className="absolute z-50 mt-2 bg-gray-900 bg-opacity-80 backdrop-blur-md border border-gray-700 border-opacity-30 rounded-lg shadow-lg w-40 max-h-64 overflow-hidden"
      style={{
        position: "absolute",
        left: selectRef.current?.getBoundingClientRect().left,
        top: selectRef.current?.getBoundingClientRect().bottom,
      }}
    >
      {/* Search Input */}
      <div className="p-2 border-b border-gray-700 border-opacity-30 sticky top-0 bg-gray-900 bg-opacity-80">
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full px-2 py-1 bg-gray-800 bg-opacity-50 text-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
        />
      </div>

      {/* Options List */}
      <div className="overflow-y-auto max-h-48">
        {filteredOptions.length === 0 && (
          <div className="p-2 text-sm text-gray-300">No results found</div>
        )}
        {filteredOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
            className={`px-4 py-2 flex items-center space-x-2 text-sm cursor-pointer transition-all duration-300 hover:bg-pink-400 hover:bg-opacity-90 hover:text-gray-200 ${
              value.value === option.value
                ? "font-bold text-gray-200 bg-pink-600"
                : "text-gray-400"
            }`}
          >
            {option.value && (
              <div className="text-gray-300">
                <TokenIcon
                  key={option.value}
                  symbol={option.value}
                  size={24}
                  color="#fff"
                />
              </div>
            )}
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={selectRef} className="relative">
      {/* Dropdown Toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-900 backdrop-blur-md border border-gray-700 border-opacity-30 rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer shadow-lg hover:bg-gray-900 hover:bg-opacity-80 transition-all duration-300 min-w-36"
      >
        <div className="flex items-center space-x-2">
          {value.value && (
            <div className="text-gray-300">
              {
                <TokenIcon
                  key={value.value}
                  symbol={value.value}
                  size={24}
                  color="#fff"
                />
              }
            </div>
          )}

          <span className="text-base font-medium text-gray-200">
            {value.value
              ? options.find((opt) => opt.value === value.value)?.label
              : placeholder || "Select"}
          </span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform text-gray-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Render Dropdown in Portal */}
      {isOpen && createPortal(dropdown, document.body)}
    </div>
  );
};

export default Select;
