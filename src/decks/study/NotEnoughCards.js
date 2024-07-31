import React from "react";
import { Link } from "react-router-dom";

function NotEnoughCards({ cardsLength, deckId }) {
  return (
    <div>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {cardsLength} cards in
        this deck.
      </p>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button className="btn btn-primary oi oi-plus">Add Cards</button>
      </Link>
    </div>
  );
}

export default NotEnoughCards;
