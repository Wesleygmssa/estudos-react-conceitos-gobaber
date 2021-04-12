import { render } from "@testing-library/react";
import SignIn from "../../pages/Singin";
import React from "react";

jest.mock("react-router-dom", () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe("SignIn Page", () => {
  it("Should be able to sigin in", () => {
    const { debug } = render(<SignIn />);

    debug();
  });
});
