import React, { useEffect, useState } from "react";
import { OptionProps } from "./Select";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SwapSection from "./SwapSection";
import SuccessModal from "./SuccessModal";
import { fetchCryptoPrices, swapToken } from "../api/crypto.api";

// Define form values type
interface FormValues {
  sellAmount: string;
}

const validationSchema = yup.object().shape({
  sellAmount: yup
    .string()
    .required("Amount is required")
    .test(
      "isNumber",
      "Amount must be a valid number",
      (value) => !isNaN(parseFloat(value ?? "")) // Check if the string can be converted to a valid number
    )
    .test(
      "minValue",
      "Minimum amount is 0.1",
      (value) => parseFloat(value ?? "") >= 0.01
    )
    .test(
      "maxValue",
      "Maximum amount is 100,000",
      (value) => parseFloat(value ?? "") <= 100000
    ),
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

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // simulate API call
  const handleSwap = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await swapToken();
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error swapping", error);
      toast.error("Swap failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setValue("sellAmount", "");
    setBuyAmount("0");
  };

  const handleSellAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow numbers and one decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setValue("sellAmount", value, {
        shouldValidate: true,
      });
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
    const loadPrices = async () => {
      try {
        const mappedOptions = await fetchCryptoPrices();
        setOptions(mappedOptions);
      } catch (error) {
        console.error("Error fetching prices", error);
        toast.error("Failed to fetch prices");
      }
    };

    loadPrices();
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
    <>
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
          disabled={!isValid || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <span className="icon-[mdi--loading] animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Processing...
            </div>
          ) : (
            "Swap"
          )}
        </button>
      </form>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        sellAmount={String(sellAmount)}
        buyAmount={buyAmount}
        sellCurrency={selectedSellOption.label}
        buyCurrency={selectedBuyOption.label}
      />
    </>
  );
};

export default CryptoSwapForm;
