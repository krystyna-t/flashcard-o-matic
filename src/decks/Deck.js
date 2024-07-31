import React from "react";
import { Link } from "react-router-dom";
import DeleteDeck from "./DeleteDeck";

function Deck({ deck }) {
  return (
    <section className="deck">
      {deck && (
        <div>
          <h2>{deck.name}</h2>
          <p>{deck.cards.length} cards</p>
          <p>{deck.description}</p>
          <div>
            <Link to={`/decks/${deck.id}`}>
              <button className="btn btn-secondary oi oi-eye">View</button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button className="btn btn-primary oi oi-book">Study</button>
            </Link>
            <DeleteDeck deckId={deck.id} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Deck;
