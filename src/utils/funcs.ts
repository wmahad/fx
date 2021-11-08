import { isWithinInterval, subDays } from "date-fns";
import type { HistoryResponse } from "./client";

const OPTIONS = {
  chart: {
    id: "fx-rates",
    toolbar: {
      show: false,
    },
  },
  title: {
    text: "USD to EUR Chart",
  },
  xaxis: {
    type: "datetime",
    title: {
      text: "Past 30 days",
    },
  },
  yaxis: {
    title: {
      text: "Prices",
    },
  },
};

type Title = {
  text?: string;
};

export function getOptions(title: Title = {}) {
  return {
    ...OPTIONS,
    title: { ...OPTIONS.title, ...title },
  };
}

export function getSeries(resp: HistoryResponse) {
  const end = new Date();
  const start = subDays(end, 30);
  const data = Object.entries(resp)
    .filter(([key]) => isWithinInterval(new Date(key), { start, end }))
    .map(([key, value]) => ({ x: new Date(key), y: value }));
  return [{ data }];
}

export function isNumber(str?: string) {
  return !!str?.length && !isNaN(Number(str));
}

export function getCurrencyName(str: string) {
  const [symbol, name] = str.split("- ");
  return name ?? symbol;
}

export function getFromLabel(
  amount: number,
  label: string,
  precision?: number
) {
  return `${amount.toFixed(precision ?? 2)} ${getCurrencyName(label)}`;
}

export function getRateLabel(base: string, target: string, value: number) {
  return `1 ${base} = ${value.toFixed(4)} ${target}`;
}
