import React, { useEffect, useState } from "react";
import { OptionProps } from "./Select";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SwapSection from "./SwapSection";

interface CurrencyData {
  currency: string;
  price: number;
}

// Define form values type
interface FormValues {
  sellAmount: string;
}

const validationSchema = yup.object().shape({
  sellAmount: yup
    .string()
    .transform((value) => (isNaN(value) ? "" : value))
    .required("Amount is required")
    .min(0.01, "Minimum amount is 0.01")
    .max(100000, "Maximum amount is 100,000"),
});

const CryptoSwapForm = () => {
  //* STATES
  const [options, setOptions] = useState<OptionProps[]>([]);
  const [selectedSellOption, setSelectedSellOption] = useState<OptionProps>({
    label: "",
    value: "",
    price: 0,
  });
  const [selectedBuyOption, setSelectedBuyOption] = useState<OptionProps>({
    label: "",
    value: "",
    price: 0,
  });
  const [buyAmount, setBuyAmount] = useState<string>("0");

  //* Add form hook
  const methods = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      sellAmount: "",
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isValid, errors },
  } = methods;

  const sellAmount = watch("sellAmount");

  const handleSwap = () => {
    // alert(
    //   `Swapping ${sellAmount} ${selectedSellOption.label.toUpperCase()} for ${buyAmount} ${selectedBuyOption.label.toUpperCase()}`
    // );
    console.log("test");
  };

  const handleSellAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setValue("sellAmount", value || "", { shouldValidate: true });
    }
  };

  const handleSwapCurrency = () => {
    // Store temporary values
    const tempSellOption = selectedSellOption;
    const tempSellAmount = sellAmount;

    // Update sell side
    setSelectedSellOption(selectedBuyOption);
    setValue("sellAmount", buyAmount || "", {
      shouldValidate: true,
      shouldTouch: true,
    });

    // Update buy side
    setSelectedBuyOption(tempSellOption);
    setBuyAmount(String(tempSellAmount));
  };

  // Fetch prices from API
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get<CurrencyData[]>(
          "https://interview.switcheo.com/prices.json"
        );
        const data = response.data;

        console.log(
          "🚀TCL: - file: CryptoSwapForm.tsx:49 - data:",
          data,
          Object.keys(data)
        );

        // Map API data to options for the Select component
        const mappedOptions = data.map((token) => ({
          value: token.currency,
          label: token.currency.toUpperCase(),
          price: token.price,
        }));

        setOptions(mappedOptions);
      } catch (error) {
        console.error("Error fetching prices", error);
        toast.error("Failed to fetch prices");
      }
    };

    fetchPrices();
  }, []);

  // Calculate buyAmount
  useEffect(() => {
    if (
      !sellAmount ||
      !selectedBuyOption?.price ||
      !selectedSellOption?.price
    ) {
      setBuyAmount("0");
      return;
    }

    const sellPrice = selectedSellOption.price;
    const buyPrice = selectedBuyOption.price;
    const convertedValue = (parseFloat(sellAmount) * sellPrice) / buyPrice;
    setBuyAmount(convertedValue.toFixed(4));
  }, [sellAmount, selectedSellOption, selectedBuyOption]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSwap)}
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
      >
        {/* Send Section */}
        <SwapSection
          title="Send"
          placeholder="0.01 - 100000"
          amount={String(sellAmount)}
          onAmountChange={handleSellAmountChange}
          selectedOption={selectedSellOption}
          onOptionChange={setSelectedSellOption}
          options={options}
          defaultValue={options[0]}
          name="sellAmount"
          error={errors.sellAmount?.message}
        />

        {/* Swap Button */}
        <div className="flex items-center justify-center relative -mt-10 -mb-10 z-10">
          <button
            type="button"
            className="w-16 h-16 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition flex items-center justify-center"
            onClick={handleSwapCurrency}
          >
            <span className="icon-[mdi--swap-vertical] text-2xl" />
          </button>
        </div>

        {/* Receive Section */}
        <SwapSection
          name="buyAmount"
          title="Receive"
          placeholder="0.01 - 100000"
          amount={buyAmount}
          selectedOption={selectedBuyOption}
          onOptionChange={setSelectedBuyOption}
          options={options}
          readOnly
          subText={`Estimated Fee: $0.05`}
          defaultValue={options[1]}
        />

        {/* Swap Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-lg shadow-lg hover:bg-pink-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!isValid}
        >
          Swap
        </button>
      </form>
    </FormProvider>
  );
};

export default CryptoSwapForm;
