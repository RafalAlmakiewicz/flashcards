# Flashcards

Application for creating thematic flashcard decks. Developed with `React`, `Redux` and `Sass`. Tested using `Jest` and `React Testing Library`. Backend services can be found in a separate repository – [Flashcards-api](https://github.com/RafalAlmakiewicz/flashcards-api).

## Hosted on Vercel

https://flashcards-ashy.vercel.app/decks

## Goals

- getting familiar with Redux
  - handling fetch requests with [async thunks](https://github.com/RafalAlmakiewicz/flashcards/blob/master/src/app/api.js)
  - creating [redux slices](https://github.com/RafalAlmakiewicz/flashcards/tree/master/src/app)
- practice creating responsive layouts using grid, flexbox and media queries
- getting familiar with [Sass](https://github.com/RafalAlmakiewicz/flashcards/tree/master/src/styles)
- practice writing [tests](https://github.com/RafalAlmakiewicz/flashcards/tree/master/src/components/tests) using Jest and React Testing Library

## Features

### Home page

List of all decks, each with a progress bar.

![main](https://user-images.githubusercontent.com/79459373/144730499-990b2f44-8c3a-438b-8183-c4a5bf8e9f92.png)

### Form

Update or create deck. If any field is currently empty, or deck contains less than 2 cards, error message is displayed.

### Learn

Study selected deck. Buttons on the top are used to flip current card, shuffle remaining cards and reset progress back to 0. After each round, percent result is displayed. All words which user could not remember are going to reappear in the next round.

![learn](https://user-images.githubusercontent.com/79459373/144730785-d0e50eef-86f8-480b-9717-ac2adcfcc909.png)

## Potential Improvements

- improve styles, UX, navigation
- progress bars are not styled properly in Firefox
- add notifications displayed when deck is updated or created
- for the sake of simplicity, user accounts are not implemented. Storing each user decks nad study progress separately would make application more practical.
