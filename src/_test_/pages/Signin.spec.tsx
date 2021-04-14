import { render, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "../../pages/Singin";
import React from "react";

//funções que não retorna nada.
const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

//
jest.mock("react-router-dom", () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});
jest.mock("../../hooks/AuthContext", () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});
jest.mock("../../hooks/ToastContext", () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

//Teste da pagina SignIn
describe("SignIn Page", () => {
  /* **Aqui fica  todos os testes  encontrado dentro da pagina SignIn*/
  it("Should be able to sigin in", async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Entrar");

    fireEvent.change(emailField, { target: { value: "johndoe@example.com" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith("/dashboard");
    });
  });
  it("Should not be able to sigin in with invalid credentials", async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Entrar");

    fireEvent.change(emailField, { target: { value: "not-valid-email" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith("/dashboard");
    });
  });
  it("Should display an error if login error", async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Entrar");

    fireEvent.change(emailField, { target: { value: "johndoe@example.com" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "error",
        })
      );
    });
  });
});
