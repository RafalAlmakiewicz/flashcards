import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { testingStore } from "./testingStore";
import { DecksList } from "../components/decksList";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { FetchMock } from "jest-fetch-mock/types";

describe("list of decks", () => {
  const {
    getByRole,
    getByTestId,
    getByText,
    queryByRole,
    queryByText,
    findByTestId,
  } = screen;

  beforeEach(() => {
    (fetch as FetchMock).resetMocks();
    render(
      <Provider store={testingStore()}>
        <BrowserRouter>
          <DecksList />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should contain deck info", () => {
    expect(getByText("seasons")).toBeInTheDocument();
    expect(getByText("0/4")).toBeInTheDocument();
  });

  it("should show learn, update and delete buttons only when cursor hovers over deck", () => {
    userEvent.hover(getByTestId("d1"));
    expect(getByRole("link", { name: /learn/i })).toBeVisible();
    expect(getByRole("link", { name: /update/i })).toBeVisible();
    expect(getByRole("button", { name: /delete/i })).toBeVisible();
    userEvent.unhover(getByTestId("d1"));
    expect(queryByRole("link", { name: /learn/i })).toBeNull();
    expect(queryByRole("link", { name: /update/i })).toBeNull();
    expect(queryByRole("button", { name: /delete/i })).toBeNull();
  });

  describe("delete deck pop up window", () => {
    beforeEach(() => {
      userEvent.hover(getByTestId("d1"));
      userEvent.click(getByRole("button", { name: /delete/i }));
    });

    it("appears when delete button is clicked", () => {
      expect(queryByText(`Do you want to delete seasons?`)).toBeInTheDocument();
    });

    it("hides when cancel button is clicked", () => {
      userEvent.click(getByRole("button", { name: /cancel/i }));
      expect(queryByText(`Do you want to delete seasons?`)).toBeNull();
    });

    it("removes deck when delete button is clicked", async () => {
      (fetch as FetchMock).once("");
      userEvent.click(getByRole("button", { name: /ok/i }));
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(await findByTestId("d1")).not.toBeVisible();
    });
  });
});
