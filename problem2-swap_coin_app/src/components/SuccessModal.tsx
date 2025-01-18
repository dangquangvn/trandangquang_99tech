import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellAmount?: string;
  buyAmount?: string;
  sellCurrency?: string;
  buyCurrency?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  sellAmount,
  buyAmount,
  sellCurrency,
  buyCurrency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        {/* Success Icon */}
        <div className="flex justify-center items-center mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span className="icon-[mdi--check] text-2xl text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          Swap Successful!
        </h2>

        {/* Description */}
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-600 text-center">
            You have successfully swapped:
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-center font-medium text-gray-800">
              {sellAmount} {sellCurrency}
              <span className="mx-2 text-gray-400">→</span>
              {buyAmount} {buyCurrency}
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Transaction ID:{" "}
            {Math.random().toString(36).slice(2, 10).toUpperCase()}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-pink-500 text-white font-semibold rounded-md shadow-md hover:bg-pink-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
