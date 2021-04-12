import { render, fireEvent } from "@testing-library/react";
import SignIn from "../../pages/Singin";
import React from "react";

const mockedHistoryPush = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe("SignIn Page", () => {
  it("Should be able to sigin in", () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Entrar");

    fireEvent.change(emailField, { target: { value: "johndoe@example.com" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    expect(mockedHistoryPush).toHaveBeenCalledWith("/dashboard");
  });
});
