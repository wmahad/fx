import { useQuery, useQueryClient } from "react-query";
import { client, fetchFXRate, fetchFXHistory } from "../utils/client";
import {
  CURRENCY_EXCHANGE_RATE,
  OPEN_EXCHANGE_API,
  FX_DAILY,
} from "../utils/constants";

type Currencies = Record<string, string>;

export type FXOption = {
  value: string;
  label: string;
};

const cacheConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

export const useCurrencies = () => {
  return useQuery("currencies", () => client(OPEN_EXCHANGE_API), {
    staleTime: Infinity,
    select(data: Currencies = {}) {
      return Object.entries(data).reduce((acc: FXOption[], [value, label]) => {
        acc.push({ value, label: `${value} - ${label}` });
        return acc;
      }, []);
    },
  });
};

export const useFxRate = (base: string, target: string) => {
  const params = {
    function: CURRENCY_EXCHANGE_RATE,
    from_currency: base,
    to_currency: target,
  };
  const queryClient = useQueryClient();
  return useQuery(["fx-rate", base, target], () => fetchFXRate(params), {
    ...cacheConfig,
    onSuccess(rate) {
      queryClient.setQueryData(
        ["fx-rate", target, base],
        1 / Number.parseFloat(rate)
      );
    },
  });
};

export const useFxRateHistory = (base: string, target: string) => {
  const params = {
    function: FX_DAILY,
    from_symbol: base,
    to_symbol: target,
  };
  const queryClient = useQueryClient();
  return useQuery(
    ["fx-rate-history", base, target],
    () => fetchFXHistory(params),
    {
      ...cacheConfig,
      async onSuccess() {
        const queryKey = ["fx-rate-history", target, base];
        const query = {
          queryKey,
          queryFn: () =>
            fetchFXHistory({
              ...params,
              from_symbol: target,
              to_symbol: base,
            }),
          config: {
            ...cacheConfig,
          },
        };
        await queryClient.prefetchQuery(query);
      },
    }
  );
};
