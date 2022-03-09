import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { testingStore } from "./testingStore";
import { Learn } from "../components/learn";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("learn", () => {
  const { getByRole, getByText } = screen;

  beforeEach(() => {
    render(
      <Provider store={testingStore("d1")}>
        <BrowserRouter>
          <Learn />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should have answer counters and progress set to 0", () => {
    expect(getByText("right: 0")).toBeInTheDocument();
    expect(getByText("wrong: 0")).toBeInTheDocument();
    expect(getByText("0/4")).toBeInTheDocument();
    screen.debug();
  });

  it("should have disabled Flip button", () => {
    expect(getByRole("button", { name: /flip/i })).toBeDisabled();
  });

  describe("veryfying answer", () => {
    beforeEach(() => {
      userEvent.click(getByRole("button", { name: /see answer/i }));
    });

    it("should show back of a card", () => {
      expect(getByText("wiosna")).toBeInTheDocument();
    });

    it("should show right/wrong answer buttons", () => {
      expect(getByRole("button", { name: /i was right/i })).toBeInTheDocument();
      expect(getByRole("button", { name: /i was wrong/i })).toBeInTheDocument();
    });

    it("should be able to flip card", () => {
      userEvent.click(getByRole("button", { name: /flip/i }));
      expect(getByText("spring")).toBeInTheDocument();
    });

    it("should go to the next card", () => {
      userEvent.click(getByRole("button", { name: /i was right/i }));
      expect(getByText("summer")).toBeInTheDocument();
      expect(getByText("right: 1")).toBeInTheDocument();
      expect(getByText("1/4")).toBeInTheDocument();
    });
  });

  describe("only first 2 answers were correct", () => {
    beforeEach(() => {
      for (let i = 0; i < 4; i++) {
        userEvent.click(getByRole("button", { name: /see answer/i }));
        userEvent.click(
          getByRole("button", { name: i < 2 ? /i was right/i : /i was wrong/i })
        );
      }
    });

    it("should show round progress in percents", () => {
      expect(getByText(/round 1: 50%/i)).toBeInTheDocument();
    });

    it("should start next round", () => {
      userEvent.click(getByRole("button", { name: /next/i }));
      expect(getByText("autumn")).toBeInTheDocument();
      expect(getByText("right: 0")).toBeInTheDocument();
      expect(getByText("wrong: 0")).toBeInTheDocument();
      expect(getByText("0/2")).toBeInTheDocument();
    });

    it("should reset all progress", () => {
      userEvent.click(getByRole("button", { name: /reset/i }));
      expect(getByText("spring")).toBeInTheDocument();
      expect(getByText("right: 0")).toBeInTheDocument();
      expect(getByText("wrong: 0")).toBeInTheDocument();
      expect(getByText("0/4")).toBeInTheDocument();
    });
  });

  describe("all answers were correct", () => {
    beforeEach(() => {
      for (let i = 0; i < 4; i++) {
        userEvent.click(getByRole("button", { name: /see answer/i }));
        userEvent.click(getByRole("button", { name: /i was right/i }));
      }
    });

    it("should show deck completed message", () => {
      expect(getByText(/deck completed/i)).toBeInTheDocument();
    });

    it("should reset progress when start over button is clicked", () => {
      userEvent.click(getByRole("button", { name: /start over/i }));
      expect(getByText("right: 0")).toBeInTheDocument();
      expect(getByText("wrong: 0")).toBeInTheDocument();
      expect(getByText("0/4")).toBeInTheDocument();
    });
  });
});
