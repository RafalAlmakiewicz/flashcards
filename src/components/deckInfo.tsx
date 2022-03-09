import { useAppSelector } from "../state/hooks";
import { selectDeckById } from "../state/decksSlice";
import { ProgressBar } from "./reusable/progressBar";

interface DeckInfoProps {
  id: string;
}

export function DeckInfo({ id }: DeckInfoProps) {
  const deck = useAppSelector(selectDeckById(id));

  return (
    <div className="deck-info">
      <h2>{deck.name}</h2>
      <ProgressBar
        value={
          deck.progress.learned.length + deck.progress.round.learned.length
        }
        max={deck.cards.length}
      />
    </div>
  );
}
