import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";

import Input from "../../components/Input";

jest.mock("@unform/core", () => {
  return {
    useField() {
      return {
        fieldName: "email",
        defaultValue: "",
        error: "",
        registerField: () => {},
      };
    },
  };
});

describe("Input component", () => {
  it("renderizar uma entrada", () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />
    );

    expect(getByPlaceholderText("E-mail")).toBeTruthy();
  });

  it("deve renderizar o destaque no foco de entrada", async () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText("E-mail");

    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);
  });
});
