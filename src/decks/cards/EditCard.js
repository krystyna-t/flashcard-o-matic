import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck, readCard } from "../../utils/api";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    if (deckId) {
      readDeck(deckId, abortController.signal)
        .then(setDeck)
        .catch((error) => console.error(`Error loading deck: ${error}`));
      return () => abortController.abort();
    }
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();
    if (cardId) {
      readCard(cardId, abortController.signal)
        .then(setCard)
        .catch((error) => console.error(`Error loading card: ${error}`));
      return () => abortController.abort();
    }
  }, [cardId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <CardForm initialFormData={card} deckId={deckId} cardId={cardId} />
    </div>
  );
}

export default EditCard;
