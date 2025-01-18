import React from "react";

interface Props {
  selected: string;
  onSelect: (currency: string) => void;
}

const currencies = ["BTC", "ETH", "USDT", "BNB", "SOL"];

const CurrencySelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <select
      value={selected}
      onChange={(e) => onSelect(e.target.value)}
      className="border rounded-lg p-2 focus:ring focus:ring-pink-500"
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
