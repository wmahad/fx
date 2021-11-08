import { rest } from "msw";
import { CURRENCY_EXCHANGE_RATE } from "../utils/constants";
import { generateCurrencies, generateFXRate } from "./data";

// add more test to cover the unhappy path
export const handlers = [
  rest.get(/\/api\/currencies*/, (req, res, ctx) => {
    return res(ctx.json(generateCurrencies()));
  }),

  rest.get(/\/query/, (req, res, ctx) => {
    const TYPE = req.url.searchParams.get("function");
    const BASE = req.url.searchParams.get("from_currency")!;
    const TARGET = req.url.searchParams.get("to_currency")!;

    if (TYPE === CURRENCY_EXCHANGE_RATE) {
      return res(ctx.json(generateFXRate(BASE, TARGET)));
    }
    return res(ctx.json({}));
  }),
];
