import React from "react";
import Deck from "./Deck";

function DeckList({ decks }) {
  return (
    <div className="decks-list">
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>
            <Deck deck={deck} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeckList;
