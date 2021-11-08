import { useState } from "react";
import {
  Main,
  Label,
  Input,
  Switch,
  Form,
  Section,
  Fieldset,
  Result,
  FromLabel,
  ToLabel,
  RateLabel,
} from "./styled";
import { Currency, CandleStickGraph } from "./components";
import type { Option } from "./components";
import { useFxRate } from "./hooks";
import { ReactQueryDevtools } from "react-query/devtools";
import { getFromLabel, isNumber, getRateLabel } from "./utils/funcs";
import { useFXCurrencies } from "./AppProviders";

function App() {
  const [base, setBase] = useState<Option>({
    value: "USD",
    label: "USD - United state dollar",
  });
  const [target, setTarget] = useState<Option>({ value: "EUR", label: "Euro" });
  const [amount, setAmount] = useState<number>(1);
  const { isLoading: isLoadingCurrencies } = useFXCurrencies();

  const { label: baseLabel, value: baseValue } = base!;
  const { label: targetLabel, value: targetValue } = target!;

  const { data, isLoading, isFetching } = useFxRate(baseValue, targetValue);
  const rate = isNumber(data) ? Number.parseFloat(data) : 1;
  const fromLabel = getFromLabel(amount, baseLabel);
  const toLabel = getFromLabel(rate * amount, targetLabel, 4);
  const baseToTarget = getRateLabel(baseValue, targetValue, rate);
  const targetToBase = getRateLabel(targetValue, baseValue, 1 / rate);

  function switchCurrencies() {
    setTarget(base);
    setBase(target);
  }

  function handleInputChange(evt: React.FormEvent<HTMLInputElement>) {
    const number = evt.currentTarget.valueAsNumber;
    setAmount(isNumber(`${number}`) && number > 0 ? number : 0);
  }

  const showLoader = isLoading || isLoadingCurrencies;

  return (
    <Main>
      <h1>Forex Exchange</h1>
      <Section>
        <Form onSubmit={(evt) => evt.preventDefault()}>
          <Fieldset aria-label="amount">
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="number"
              id="amount"
              min="1"
              value={amount === 0 ? "" : amount}
              onChange={handleInputChange}
              disabled={isFetching}
            />
          </Fieldset>
          <Currency
            name="base"
            currency={base}
            onChange={setBase}
            isLoading={isFetching}
          />
          <Switch onClick={switchCurrencies} disabled={isFetching}>
            <span />
          </Switch>
          <Currency
            name="target"
            currency={target}
            onChange={setTarget}
            isLoading={isFetching}
          />
        </Form>

        <Result
          isLoading={showLoader}
          role={showLoader ? "alert" : "complementary"}
        >
          <FromLabel role="fromLabel">{fromLabel} =</FromLabel>
          <ToLabel role="toLabel">{toLabel}</ToLabel>
          <RateLabel role="baseToTarget">{baseToTarget}</RateLabel>
          <RateLabel role="targetToBase">{targetToBase}</RateLabel>
        </Result>
      </Section>

      <CandleStickGraph base={baseValue} target={targetValue} />
      <ReactQueryDevtools />
    </Main>
  );
}

export default App;
