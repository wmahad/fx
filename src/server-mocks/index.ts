import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import { QueryClient } from "react-query";

export const client = new QueryClient();

const server = setupServer(...handlers);

export * from "msw";
export { server };
