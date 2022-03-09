import React, { useEffect } from "react";
import { DecksList } from "./components/decksList";
import { Switch, Route, Redirect } from "react-router";
import { Learn } from "./components/learn";
import { getAll } from "./state/thunks";
import { useDispatch } from "react-redux";
import { DeckForm } from "./components/deckForm";
import { Header } from "./components/header";
import { Aside } from "./components/aside";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faPlus,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
library.add(faTrashAlt, faPlus, faExclamation);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, []);

  return (
    <React.Fragment>
      <Header />
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
      <Aside />
    </React.Fragment>
  );
}

export default App;
