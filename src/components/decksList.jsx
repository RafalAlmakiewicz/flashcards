import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchData from "../app/fetchData";

export const DecksList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    console.log("fetching data");
  }, []);

  return <div></div>;
};
