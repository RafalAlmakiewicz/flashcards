import React, { useEffect } from "react";
import { getAll } from "./state/thunks";
import { useDispatch } from "react-redux";
import { Header } from "./components/header";
import { Aside } from "./components/aside";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faPlus,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Main } from "./components/main";
library.add(faTrashAlt, faPlus, faExclamation);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Main />
      <Aside />
    </React.Fragment>
  );
}

export default App;
