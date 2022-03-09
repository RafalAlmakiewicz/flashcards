import { DecksList } from "./decksList";
import { Switch, Route, Redirect } from "react-router";
import { Learn } from "./learn";
import { DeckForm } from "./deckForm";
import { useAppSelector } from "../state/hooks";
import { selectGetAllStatus } from "../state/statusSlice";

export const Main = () => {
  const getAllStatus = useAppSelector(selectGetAllStatus);

  switch (getAllStatus) {
    case "idle":
      return (
        <Switch>
          <Route path="/learn">
            <Learn />
          </Route>
          <Route path="/update">
            <DeckForm />
          </Route>
          <Route path="/new">
            <DeckForm />
          </Route>
          <Route path="/decks">
            <DecksList />
          </Route>
          <Redirect from="/" exact to="/decks" />
        </Switch>
      );
    case "loading":
      return (
        <p className="fetch-loading">
          {"Loading... (initially can take 30 seconds)"}
        </p>
      );
    default:
      return <p className="fetch-error">{getAllStatus}</p>;
  }
};
