// Note: Ideally this file should be as small as possible but because the app isn't to big
// that's why I am combining the Provider for fetching currencies and theme
import { useCurrencies, FXOption } from "./hooks";
import { QueryClientProvider, QueryClient } from "react-query";
import { createContext, useContext } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  p {
    margin: 0 0 0.1rem 0;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

interface FxCurrenciesContext {
  currencies: FXOption[];
  isLoading: boolean;
}

const FXContext = createContext<FxCurrenciesContext | null>(null);
FXContext.displayName = "FXContext";

export const useFXCurrencies = () => {
  const context = useContext(FXContext);
  if (!context) {
    throw new Error("useFXCurrencies must be used within a FXProvider");
  }
  return context;
};

function FXProvider({ children }: { children: JSX.Element }) {
  const { isLoading, data = [] } = useCurrencies();
  const value = { currencies: data, isLoading };
  return <FXContext.Provider value={value}>{children}</FXContext.Provider>;
}

export const AppProviders = ({
  children,
  client,
}: {
  children: JSX.Element;
  client: QueryClient;
}) => {
  return (
    <ThemeProvider theme={{}}>
      <QueryClientProvider client={client}>
        <FXProvider>{children}</FXProvider>
      </QueryClientProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};
