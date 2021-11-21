import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { testingStore } from "../../App/store";
import { DeckForm } from "../deckForm";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("update deck form ", () => {
  const { getAllByRole, getByDisplayValue, queryByDisplayValue, getByText } =
    screen;

  beforeEach(() => {
    fetch.resetMocks();
    render(
      <Provider store={testingStore("d1")}>
        <BrowserRouter>
          <DeckForm />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should contain deck name and cards", () => {
    expect(getByDisplayValue("seasons")).toBeInTheDocument();
    expect(getByDisplayValue("wiosna")).toBeInTheDocument();
    expect(getByDisplayValue("spring")).toBeInTheDocument();
  });

  it("should change input value when user is typing", () => {
    const input = getByDisplayValue("wiosna");
    userEvent.clear(input);
    userEvent.type(input, "x");
    expect(input).toHaveValue("x");
  });

  it("should remove card from form when delete button is clicked", () => {
    userEvent.click(getAllByRole("button", { name: /delete/i })[0]);
    expect(queryByDisplayValue("spring")).not.toBeInTheDocument();
  });

  it("should show error when front is empty", () => {
    userEvent.clear(getByDisplayValue("spring"));
    expect(getByText("front and back are required!")).toBeInTheDocument();
  });

  it("should show error when name is empty", () => {
    userEvent.clear(getByDisplayValue("seasons"));
    expect(getByText("name is required!")).toBeInTheDocument();
  });

  it("should show error when name is empty", () => {
    userEvent.clear(getByDisplayValue("seasons"));
    expect(getByText("name is required!")).toBeInTheDocument();
  });

  it("should show error when deck has less than 2 cards", () => {
    let buttons = getAllByRole("button", { name: /delete/i });
    buttons.forEach((button) => userEvent.click(button));
    expect(
      getByText("deck must contain at least 2 cards.")
    ).toBeInTheDocument();
  });
});
