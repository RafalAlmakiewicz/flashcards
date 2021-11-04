import React, { useEffect } from "react";
import { DecksList } from "./components/decksList";
import { Switch, Route, Redirect } from "react-router";
import { Learn } from "./components/learn";
import fetchData from "./app/fetchData";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <Switch>
      <Route path="/learn">
        <Learn />
      </Route>
      <Route path="/decks">
        <DecksList />
      </Route>
      <Redirect from="/" exact to="/decks" />
    </Switch>
  );
}

export default App;
