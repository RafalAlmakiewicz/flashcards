import { Card, CardForm } from "./cardTypes";

export interface ApiDeck {
  _id?: string;
  name: string;
  cards: Card[] | CardForm[];
}

export interface DecksState {
  decks: Decks;
  current: string;
}

export interface Decks {
  [_id: string]: Deck;
}

export interface Deck {
  _id: string;
  name: string;
  progress: Progress;
  cards: string[];
}

export interface Progress {
  round: Round;
  learned: string[];
}

export interface Round {
  number: number;
  notTried: string[];
  failed: string[];
  learned: string[];
}
