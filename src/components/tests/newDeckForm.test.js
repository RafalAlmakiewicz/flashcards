import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { testingStore } from "../../App/store";
import { DeckForm } from "../deckForm";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("new deck form ", () => {
  const {
    queryAllByDisplayValue,
    getByPlaceholderText,
    getByDisplayValue,
    getByRole,
    getByText,
  } = screen;

  beforeEach(() => {
    fetch.resetMocks();
    render(
      <Provider store={testingStore()}>
        <BrowserRouter>
          <DeckForm />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should contain no cards", () => {
    expect(queryAllByDisplayValue(/card/)).toEqual([]);
  });

  it("should show validation error", () => {
    expect(
      getByText("deck must contain at least 2 cards.")
    ).toBeInTheDocument();
  });

  it("should have default value for deck name field", () => {
    expect(getByDisplayValue("name")).toBeInTheDocument();
  });

  it("should have new card form with placeholders for front and back", () => {
    expect(getByPlaceholderText("front")).toBeInTheDocument();
    expect(getByPlaceholderText("back")).toBeInTheDocument();
  });

  it("should add new card", () => {
    const front = getByPlaceholderText("front");
    userEvent.type(front, "cat");
    const back = getByPlaceholderText("back");
    userEvent.type(back, "kot");
    userEvent.click(getByRole("button", { name: /add/i }));
    expect(front).not.toHaveValue();
    expect(back).not.toHaveValue();
    expect(getByDisplayValue("cat")).toBeInTheDocument();
    expect(getByDisplayValue("kot")).toBeInTheDocument();
  });
});
