import React from "react";
import { Link } from "react-router-dom";

function Card({ card, handleDeleteCard }) {
  return (
    <div className="card">
      <div className="card-content">
        <p>{card.front}</p>
        <p>{card.back}</p>
      </div>
      <div class="card-buttons">
        <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`}>
          <button className="btn btn-secondary oi oi-pencil">Edit</button>
        </Link>
        <button
          className="btn btn-danger oi oi-trash"
          onClick={() => handleDeleteCard(card.id)}
        />
      </div>
    </div>
  );
}

export default Card;
