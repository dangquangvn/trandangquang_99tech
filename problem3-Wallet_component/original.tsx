/**
 * FIXME: missing `blockchain` property in the `WalletBalance` interface
 */
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  /**
   * FIXME: blockchain should be a string
   */
  const getPriority = (blockchain: any): number => {
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

  /**
   * FIXME:
   * 1. lhsPriority are not defined, you mean balancePriority?
   * 2. balance have typeof WalletBalance, so balance.blockchain is not a valid property
   * 3. wrong condition in filtering function, should be balance.amount > 0
   * 4. missing return statement for the case where leftPriority === rightPriority => should return 0
   *
   * ANTI-PATTERN:
   * 1. the `getPriority` function is repeatedly called for each balance inside both `filter` and `sort` functions, which is computationally expensive => should be used only once
   * 2. unnecessary `prices` dependency in `useMemo` hook => should be removed
   */

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  /**
   * FIXME:
   * 1. this row use `formatted` property from `balance` object, but the `formatted` property is not defined in the `WalletBalance` interface => should be `formattedBalances`
   * 2. `sortedBalances` are mapped twice: once for formatting and once for rendering => should be combined into one to avoid unnecessary iteration
   *
   * ANTI-PATTERN:
   * 1. Using index as a key for the list of items, it can cause issues when the list changes dynamically => should use a unique key for each item
   * 2. assuming that the `sortedBalances` is a heavy computation, it should be memoized to avoid unnecessary re-computation => Memoizi `rows` to avoid re-computation
   *
   */

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
