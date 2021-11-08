// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import "whatwg-fetch";
import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";
import { server, client } from "./server-mocks";

configure({ defaultHidden: true, throwSuggestions: true });

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());

afterEach(() => {
  client.clear();
  server.resetHandlers();
});
