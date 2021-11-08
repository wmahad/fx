import {
  render as rtlRender,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { data } from "./server-mocks/data";
import App from "./App";
import { getFromLabel, getRateLabel } from "./utils/funcs";
import { client } from "./server-mocks";
import { AppProviders } from "./AppProviders";

// React apexcharts has issues with testing it.
jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: (props: unknown) => {
      return <pre>{JSON.stringify(props, null, 2)}</pre>;
    },
  };
});

// @ts-ignore
jest.mock("react-select", () => ({ options, value, onChange, id }) => {
  // @ts-ignore
  function handleChange(event) {
    const option = options.find(
      // @ts-ignore
      (option) => option.value === event.currentTarget.value
    );
    onChange(option);
  }

  return (
    <select aria-label={id} value={value} onChange={handleChange}>
      {options.map(({ label, value }: { label: string; value: string }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});

const waitForLoadingToFinish = () => {
  return waitForElementToBeRemoved(() => [...screen.getAllByRole("alert")], {
    timeout: 4000,
  });
};

type Options = Omit<RenderOptions, "wrapper">;

function TestProvider({ children }: { children: JSX.Element }) {
  return <AppProviders client={client}>{children}</AppProviders>;
}

const render = async (ui: JSX.Element, options?: Options) => {
  const result = rtlRender(ui, { wrapper: TestProvider, ...options });
  await waitForLoadingToFinish();
  return result;
};

beforeEach(async () => {
  await render(<App />);
  const heading = screen.getByRole("heading", {
    name: /forex exchange/i,
  });
  expect(heading).toBeInTheDocument();
});

test("Calculates the rate when you change the value in the from dropdown", async () => {
  const amount = +data["USD"].amount;
  expect(screen.getByRole("fromLabel").textContent).toMatch(
    /1.00 united state dollar/gi
  );
  expect(screen.getByRole("baseToTarget").textContent).toMatch(
    getRateLabel("USD", "EUR", amount)
  );
  expect(screen.getByRole("targetToBase").textContent).toMatch(
    getRateLabel("EUR", "USD", 1 / amount)
  );

  userEvent.selectOptions(
    screen.getByRole("combobox", { name: /base/i }),
    "RUB"
  );
  await waitForLoadingToFinish();

  const rubAmount = +data["RUB"].amount;
  expect(screen.getByRole("fromLabel").textContent).toMatch(
    /1.00 russian ruble/gi
  );
  expect(screen.getByRole("baseToTarget").textContent).toMatch(
    getRateLabel("RUB", "EUR", rubAmount)
  );
  expect(screen.getByRole("targetToBase").textContent).toMatch(
    getRateLabel("EUR", "RUB", 1 / rubAmount)
  );
});

test("Calculates the rate when you change the value in the to dropdown", async () => {
  const amount = +data["USD"].amount;
  expect(screen.getByRole("toLabel").textContent).toMatch(/0.7327 euro/gi);
  expect(screen.getByRole("baseToTarget").textContent).toMatch(
    getRateLabel("USD", "EUR", amount)
  );
  expect(screen.getByRole("targetToBase").textContent).toMatch(
    getRateLabel("EUR", "USD", 1 / amount)
  );

  userEvent.selectOptions(
    screen.getByRole("combobox", { name: /target/i }),
    "UGX"
  );
  await waitForLoadingToFinish();

  expect(screen.getByRole("toLabel").textContent).toMatch(
    /0.7327 Ugandan Shilling/gi
  );
  expect(screen.getByRole("baseToTarget").textContent).toMatch(
    getRateLabel("USD", "UGX", amount)
  );
  expect(screen.getByRole("targetToBase").textContent).toMatch(
    getRateLabel("UGX", "USD", 1 / amount)
  );
});

test("Calculates the rate when you change the value on the input", async () => {
  const amount = +data["USD"].amount;
  expect(screen.getByRole("toLabel").textContent).toMatch(
    getFromLabel(amount, "Euro", 4)
  );

  userEvent.clear(screen.getByRole("spinbutton", { name: /amount/i }));
  userEvent.type(screen.getByRole("spinbutton", { name: /amount/i }), "4");

  expect(screen.getByRole("toLabel").textContent).toMatch(
    getFromLabel(amount * 4, "Euro", 4)
  );
});

test("Calculates the rate when you click the switch button", async () => {
  expect(screen.getByRole("fromLabel").textContent).toMatch(
    /1.00 united state dollar/gi
  );
  userEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("fromLabel").textContent).toMatch(/1.00 Euro/gi);
});
