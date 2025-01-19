/**
 * This is a refactored version of the Wallet component.
 * 1. Efficient Filtering and Sorting: Combined the filtering and sorting logic into a single step using `map` to precompute `priority` and `formatted` fields.
 * 2. Correct Type Handling: Added the `blockchain` field to the `WalletBalance` interface to match the usage in the original code.
 * 2. Removed Unnecessary Dependencies: Removed the `prices` dependency from the `useMemo` hook as it was not used.
 * 3. Memoized Rows: Memoized the rows computation to avoid unnecessary re-renders.
 * 4. Unique Key: Replaced `index` with `balance.currency` as a unique key for each row.
 */
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added to match the usage in the original code
}

interface FormattedWalletBalance extends WalletBalance {
  priority: number;
  formatted: string;
}

interface Props extends BoxProps {}

// move getPriority function outside of the component, so it's not redefined on each render, could be exported to improve reusability
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

// Component WalletList: Encapsulation for Rows Rendering
const WalletList: React.FC<{
  balances: FormattedWalletBalance[];
  prices: Record<string, number>;
}> = React.memo(({ balances, prices }) => {
  return (
    <>
      {balances.map((balance) => {
        const usdValue = (prices[balance.currency] || 0) * balance.amount;
        return (
          <WalletRow
            className="wallet-row"
            key={balance.currency} // Unique key
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
            currency={balance.currency}
            blockchain={balance.blockchain}
          />
        );
      })}
    </>
  );
});

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;

  // assume these are heavy computations
  const balances = useWalletBalances();
  const prices = usePrices();

  // Memoized sorting and formatting
  const sortedAndFormattedBalances = useMemo(() => {
    return balances
      .filter(
        (balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0
      )
      .map((balance) => ({
        ...balance,
        priority: getPriority(balance.blockchain),
        formatted: balance.amount.toFixed(2),
      }))
      .sort((lhs, rhs) => rhs.priority - lhs.priority);
  }, [balances]);

  return (
    <div {...rest}>
      <WalletList balances={sortedAndFormattedBalances} prices={prices} />
    </div>
  );
};
