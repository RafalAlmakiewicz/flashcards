import React, { useEffect } from "react";
import { DecksList } from "./components/decksList";
import { Switch, Route, Redirect } from "react-router";
import { Learn } from "./components/learn";
import { getAll } from "./app/api";
import { useDispatch } from "react-redux";
import { DeckForm } from "./components/deckForm";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, []);

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
}

export default App;
