import { Deck, ApiDeck } from "./types/deckTypes";

const endpoint = "https://flashcards-7795.herokuapp.com/flashcards/api/decks/";

const getAll = async () => {
  const response = await fetch(endpoint);
  if (!response.ok) return Promise.reject(createErrorMessage(response));
  const data = await response.json();
  return data;
};

const create = async (deck: ApiDeck) => {
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(deck),
    headers,
  });
  if (!response.ok) return Promise.reject(createErrorMessage(response));
  const data = await response.json();
  return data;
};

const update = async (id: string, deck: ApiDeck) => {
  const response = await fetch(`${endpoint}/${id}`, {
    method: "PUT",
    body: JSON.stringify(deck),
    headers,
  });
  if (!response.ok) return Promise.reject(createErrorMessage(response));
  const data = await response.json();
  return data;
};

const remove = async (deck: Deck) => {
  const response = await fetch(`${endpoint}/${deck._id}`, {
    method: "DELETE",
  });
  if (!response.ok) return Promise.reject(createErrorMessage(response));
  return deck;
};

const createErrorMessage = (response: Response) =>
  `error ${response.status} ${response.statusText}`;

const headers = {
  "Content-Type": "application/json",
};

const api = { getAll, update, create, remove };
export default api;
