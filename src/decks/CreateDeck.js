import React from "react";
import { Link } from "react-router-dom";
import DeckForm from "./DeckForm";

function CreateDeck() {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <DeckForm initialFormData="" deckId="" />
    </div>
  );
}

export default CreateDeck;
