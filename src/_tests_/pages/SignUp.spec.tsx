import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import api from "../../services/api";
import SignUp from "../../pages/SingUp";

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

const apiMock = new MockAdapter(api);

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock("../../hooks/ToastContext", () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe("SignUp Page", () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
  });

  it("deve ser capaz de se inscrever", async () => {
    apiMock.onPost("users").replyOnce(200, {});

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText("Nome");
    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Cadastrar");

    fireEvent.change(nameField, { target: { value: "John Doe" } });
    fireEvent.change(emailField, { target: { value: "johndoe@example.com" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith("/");
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "success",
        })
      );
    });
  });

  it("não deve ser capaz de se inscrever com credenciais inválidas", async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText("Nome");
    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Cadastrar");

    fireEvent.change(nameField, { target: { value: "John Doe" } });
    fireEvent.change(emailField, { target: { value: "not-valid-email" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it("deve exibir um erro se a inscrição falhar", async () => {
    apiMock.onPost("users").replyOnce(400);

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText("Nome");
    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Cadastrar");

    fireEvent.change(nameField, { target: { value: "John Doe" } });
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
