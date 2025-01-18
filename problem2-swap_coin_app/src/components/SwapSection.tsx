import React from "react";
import Select, { OptionProps } from "./Select";

interface SwapSectionProps {
  title: string;
  placeholder: string;
  amount: string;
  onAmountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedOption: OptionProps;
  onOptionChange: (option: OptionProps) => void;
  options: OptionProps[];
  readOnly?: boolean;
  subText?: string;
  defaultValue?: OptionProps;
  error?: string;
}

const SwapSection: React.FC<SwapSectionProps> = ({
  title,
  amount,
  onAmountChange,
  selectedOption,
  onOptionChange,
  options,
  readOnly = false,
  subText,
  placeholder,
  defaultValue,
  error,
}) => {
  return (
    <div className="relative mb-6 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-lg border border-white border-opacity-30 p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
      <div className="flex items-center">
        <input
          type="text"
          lang="en"
          value={amount}
          onChange={onAmountChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`flex-1 text-3xl font-semibold bg-transparent outline-none placeholder-gray-400 ${
            error ? "text-red-500" : "text-gray-900"
          }`}
        />
      </div>
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
      <p className="mt-1 text-sm text-gray-500">
        {subText ||
          `${selectedOption?.price?.toFixed(2) || 0.0} USD per ${selectedOption?.label?.toUpperCase()}`}
      </p>

      <div className="relative flex justify-between items-center mt-4">
        <Select
          options={options}
          value={selectedOption}
          onChange={onOptionChange}
          placeholder="Choose an option"
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
};

export default SwapSection;
