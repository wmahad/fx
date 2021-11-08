import Chart from "react-apexcharts";
import styled from "styled-components";
import { useFxRateHistory } from "../hooks";
import { getOptions, getSeries } from "../utils/funcs";

const Section = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 4rem;
`;

type ChartProps = Chart["props"];

export function CandleStickGraph({
  base,
  target,
}: {
  base: string;
  target: string;
}) {
  const { data = {} } = useFxRateHistory(base, target);
  const title = {
    text: `${base} to ${target} Chart`,
  };

  const options = getOptions(title) as ChartProps;
  const series = getSeries(data);

  return (
    <Section>
      <Chart
        width={"850"}
        height="350"
        type="candlestick"
        series={series}
        options={options}
      />
    </Section>
  );
}
