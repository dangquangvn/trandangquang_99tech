import axios from "axios";
import { OptionProps } from "../components/Select";

interface CurrencyData {
  currency: string;
  price: number;
}

export const fetchCryptoPrices = async (): Promise<OptionProps[]> => {
  try {
    const response = await axios.get<CurrencyData[]>(
      "https://interview.switcheo.com/prices.json"
    );

    // Map API data to options for the Select component
    return response.data.map((token) => ({
      value: token.currency,
      label: token.currency.toUpperCase(),
      price: token.price,
    }));
  } catch (error) {
    console.error("Error fetching prices", error);
    throw new Error("Failed to fetch prices");
  }
};

export const swapToken = async (): Promise<void> => {
  // Simulate API call with 1s delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
};
