import { ALPHA_VANTAGE_API } from "./constants";
import qs from "query-string";

type Currencies = Record<string, string>;
type History = Record<string, Currencies>;
export type HistoryResponse = Record<string, number[]>;

export async function client(uri: string, options = {}) {
  const config = {
    method: "GET",
    ...options,
  };

  return window.fetch(uri, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) return data;
    return Promise.reject(data);
  });
}

export const alphaClient = (params: Record<string, string> = {}) => {
  const query = qs.stringify({ ...params, apikey: "PYXOOYHQWXI829TK" });
  return client(`${ALPHA_VANTAGE_API}?${query}`);
};

export const fetchFXRate = async (params: Record<string, string> = {}) => {
  const resp = await alphaClient(params);
  const rate = resp?.["Realtime Currency Exchange Rate"];
  if (rate) return rate["5. Exchange Rate"];
  return Promise.reject(resp);
};

export const fetchFXHistory = async (params: Record<string, string> = {}) => {
  const resp = await alphaClient(params);
  const history: History = resp?.["Time Series FX (Daily)"];
  if (!history) return Promise.reject(resp);

  return Object.entries(history).reduce((acc: HistoryResponse, cur) => {
    const [key, value] = cur;
    acc[key] = Object.values(value).map((val) => Number.parseFloat(val));
    return acc;
  }, {});
};
