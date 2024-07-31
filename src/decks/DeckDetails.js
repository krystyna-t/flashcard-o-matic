import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api";
import DeleteDeck from "./DeleteDeck";
import Card from "./cards/Card";

function DeckDetails() {
  const [deck, setDeck] = useState({});
  const [cardsSize, setCardsSize] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    if (deckId) {
      readDeck(deckId, abortController.signal)
        .then((deck) => {
          setDeck(deck);
          setCardsSize(deck.cards ? deck.cards.length : 0);
        })
        .catch((error) => console.error(`Error loading deck: ${error}`));
      return () => abortController.abort();
    }
  }, [deckId, cardsSize]);

  const handleDeleteCard = async (cardIdToDelete) => {
    const confirmDelete = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    if (confirmDelete) {
      await deleteCard(cardIdToDelete);
      setCardsSize(cardsSize - 1);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <section className="deck-details">
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <div>
          <Link to={`/decks/${deckId}/edit`}>
            <button className="btn btn-secondary oi oi-pencil">Edit</button>
          </Link>
          <Link to={`/decks/${deckId}/study`}>
            <button className="btn btn-primary oi oi-book">Study</button>
          </Link>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button className="btn btn-primary oi oi-plus">Add Cards</button>
          </Link>
          <DeleteDeck deckId={deckId} />
        </div>
      </section>
      <br />
      <section className="cards">
        <h2>Cards</h2>
        <div className="cards-list">
          <ul>
            {deck.cards?.map((card) => (
              <li key={card.id}>
                <Card card={card} handleDeleteCard={handleDeleteCard} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default DeckDetails;
