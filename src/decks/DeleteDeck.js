import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeleteDeck({ deckId }) {
  const navigate = useNavigate();

  const handleDeleteDeck = async (event) => {
    event.preventDefault();
    const confirmDelete = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (confirmDelete) {
      await deleteDeck(deckId);
      navigate("/");
    }
  };

  return (
    <button className="btn btn-danger oi oi-trash" onClick={handleDeleteDeck} />
  );
}

export default DeleteDeck;
