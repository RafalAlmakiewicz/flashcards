import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { testingStore } from "./testingStore";
import { DeckForm } from "../components/deckForm";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { FetchMock } from "jest-fetch-mock/types";

describe("new deck form ", () => {
  const {
    queryAllByDisplayValue,
    getByPlaceholderText,
    getByDisplayValue,
    getByTestId,
    getByText,
  } = screen;

  beforeEach(() => {
    (fetch as FetchMock).resetMocks();
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
    userEvent.click(getByTestId("add-card"));
    expect(front).not.toHaveValue();
    expect(back).not.toHaveValue();
    expect(getByDisplayValue("cat")).toBeInTheDocument();
    expect(getByDisplayValue("kot")).toBeInTheDocument();
  });
});
