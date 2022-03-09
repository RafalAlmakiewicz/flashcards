export interface Cards {
  [_id: string]: Card;
}

export interface Card {
  _id: string;
  front: string;
  back: string;
}

export interface CardForm {
  front: string;
  back: string;
}
