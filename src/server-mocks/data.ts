type Option = Record<string, number | string>;

export const data: Record<string, Option> = {
  BYN: { title: "Belarusian Ruble", amount: "0.123" },
  BZD: { title: "Belize Dollar" },
  CAD: { title: "Canadian Dollar", amount: "0.534" },
  CDF: { title: "Congolese Franc", amount: "0.8623" },
  CHF: { title: "Swiss Franc", amount: "1.3545" },
  CLF: { title: "Chilean Unit of Account (UF)", amount: "4.534" },
  CLP: { title: "Chilean Peso", amount: "4" },
  CNH: { title: "Chinese Yuan (Offshore)", amount: "0.4352" },
  CNY: { title: "Chinese Yuan", amount: "0.768" },
  EUR: { title: "Euro", amount: "2.2632" },
  RUB: { title: "Russian Ruble", amount: "0.574" },
  RWF: { title: "Rwandan Franc", amount: "0.52352" },
  TZS: { title: "Tanzanian Shilling", amount: "1.533" },
  UAH: { title: "Ukrainian Hryvnia", amount: "7" },
  UGX: { title: "Ugandan Shilling", amount: "0.8684" },
  USD: { title: "United States Dollar", amount: "0.732656" },
  UYU: { title: "Uruguayan Peso", amount: "3.35325" },
  UZS: { title: "Uzbekistan Som", amount: "0.25235" },
};

export function generateFXRate(base: string, target: string) {
  return {
    "Realtime Currency Exchange Rate": {
      "1. From_Currency Code": base,
      "3. To_Currency Code": target,
      "5. Exchange Rate": data[base]?.amount,
      "6. Last Refreshed": "2021-11-08 15:26:44",
      "7. Time Zone": "UTC",
      "8. Bid Price": "0.86226000",
      "9. Ask Price": "0.86231000",
    },
  };
}

export function generateCurrencies() {
  return Object.entries(data).reduce((acc: Option, [key, value]) => {
    acc[key] = value.title;
    return acc;
  }, {});
}
