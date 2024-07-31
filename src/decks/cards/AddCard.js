import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck } from "../../utils/api";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    if (deckId) {
      readDeck(deckId, abortController.signal)
        .then(setDeck)
        .catch((error) => console.error(`Error loading deck: ${error}`));
      return () => abortController.abort();
    }
  }, [deckId]);

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
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>
      <CardForm initialFormData="" deckId={deckId} cardId="" />
    </div>
  );
}

export default AddCard;
