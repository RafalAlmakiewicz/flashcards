# Flashcards

Application for creating thematic flashcard decks. Developed with `React`, `Redux` and `Sass`. Tested using `Jest` and `React Testing Library`. Backend services can be found in a separate repository – [Flashcards-api](https://github.com/RafalAlmakiewicz/flashcards-api).

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

![main_small](https://user-images.githubusercontent.com/79459373/144730548-edbcc58a-1476-4802-89aa-e4761ca48280.png)
![main_popup](https://user-images.githubusercontent.com/79459373/144730546-606024b8-d7d6-4641-8dea-ba700350f402.png)

### Form

Update or create deck. If any field is currently empty, or deck contains less than 2 cards, error message is displayed.

![form](https://user-images.githubusercontent.com/79459373/144730780-12392bec-058f-4ccd-b603-c3a71ce3377f.png)
![form_small](https://user-images.githubusercontent.com/79459373/144730781-5375b983-e827-4f00-8ad3-bd2d16bc7a44.png)

### Learn

Study selected deck. Buttons on the top are used to flip current card, shuffle remaining cards and reset progress back to 0. After each round, percent result is displayed. All words which user could not remember are going to reappear in the next round.

![learn](https://user-images.githubusercontent.com/79459373/144730785-d0e50eef-86f8-480b-9717-ac2adcfcc909.png)

## Potential Improvements

- progress bars are not styled properly in Firefox
- add notifications displayed when deck is updated or created
- for the sake of simplicity, user accounts are not implemented. Storing each user decks nad study progress separately would make application more practical.
